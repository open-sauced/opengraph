import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs/promises";
import { GithubService } from "../../github/github.service";
import { S3FileStorageService } from "../../s3-file-storage/s3-file-storage.service";

import tailwindConfig from "../templates/tailwind.config";
import { firstValueFrom } from "rxjs";

import { RequiresUpdateMeta } from "../user-card/user-card.service";
import { DbInsight, DbUserInsightRepo } from "../../github/entities/db-insight.entity";
import insightCardTemplate from "../templates/insight-card.template";
import insightRepos from "../templates/shared/insight-repos";
import insightContributors from "../templates/shared/insight-contributors";

interface InsightCardData {
  pageName: string;
  repos: { repoName: string; avatarUrl: string }[];
  contributors: string[];
  updated_at: Date;
}

@Injectable()
export class InsightCardService {
  private readonly logger = new Logger(this.constructor.name);

  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly s3FileStorageService: S3FileStorageService,
  ) { }

  private async getInsightData (insightId: number): Promise<InsightCardData> {
    const maxRepoQueryIdsLenght = 10;

    const insightPageApiReq = firstValueFrom(
      this.httpService.get<DbInsight>(`${process.env.API_BASE_URL!}/v2/insights/${insightId}?include=none`),
    );
    const insightReposApiReq = firstValueFrom(
      this.httpService.get<DbUserInsightRepo[]>(`${process.env.API_BASE_URL!}/v2/insights/${insightId}/repos`),
    );
    const [insightPageReq, insightReposReq] = await Promise.all([insightPageApiReq, insightReposApiReq]);

    const { name, updated_at } = insightPageReq.data;
    const { data: repos } = insightReposReq;
    const query = (new URLSearchParams);

    query.set(
      "repoIds",
      repos
        .slice(0, maxRepoQueryIdsLenght)
        .map(repo => repo.repo_id)
        .join(","),
    );

    const contributorsReq = await firstValueFrom(
      this.httpService.get<{ data: { author_login: string }[] }>(
        `${process.env.API_BASE_URL!}/v2/contributors/search?${String(query)}`,
      ),
    );

    const contributorsRes = contributorsReq.data.data;
    const contributors = contributorsRes.map(
      ({ author_login }) => `https://www.github.com/${author_login}.png?size=50`,
    );

    const repositories = repos.map(repo => {
      const [owner, repoName] = repo.full_name.split("/");

      return {
        repoName,
        avatarUrl: `https://www.github.com/${owner}.png?size=50`,
      };
    });

    return {
      pageName: name,
      repos: repositories,
      contributors,
      updated_at: new Date(updated_at),
    };
  }

  // public only to be used in local scripts. Not for controller direct use.
  async generateCardBuffer (insightId: number, insightData?: InsightCardData) {
    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { pageName, repos, contributors } = insightData ? insightData : await this.getInsightData(insightId);

    const template = html(insightCardTemplate(pageName, insightContributors(contributors), insightRepos(repos, 3)));

    const interArrayBuffer = await fs.readFile("node_modules/@fontsource/inter/files/inter-all-400-normal.woff");
    const interArrayBufferMedium = await fs.readFile("node_modules/@fontsource/inter/files/inter-all-500-normal.woff");

    const svg = await satori(template, {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: "Inter",
          data: interArrayBuffer,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interArrayBufferMedium,
          weight: 500,
          style: "normal",
        },
      ],
      tailwindConfig,
    });

    const resvg = new Resvg(svg, { background: "rgba(238, 235, 230, .9)" });

    const pngData = resvg.render();

    return { png: pngData.asPng(), svg };
  }

  async checkRequiresUpdate (id: number): Promise<RequiresUpdateMeta> {
    const hash = `insights/${String(id)}.png`;
    const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;
    const hasFile = await this.s3FileStorageService.fileExists(hash);

    const returnVal: RequiresUpdateMeta = {
      fileUrl,
      hasFile,
      needsUpdate: true,
      lastModified: null,
    };

    if (hasFile) {
      const lastModified = await this.s3FileStorageService.getFileLastModified(hash);

      returnVal.lastModified = lastModified;

      const { updated_at } = await this.getInsightData(id);

      if (lastModified && lastModified > updated_at) {
        this.logger.debug(
          `Highlight ${id} exists in S3 with lastModified: ${lastModified.toISOString()} newer than updated_at: ${updated_at.toISOString()}, and reaction count is the same, redirecting to ${fileUrl}`,
        );
        returnVal.needsUpdate = false;
      }
    }

    return returnVal;
  }

  async getgetInsightCard (id: number): Promise<string> {
    const { remaining } = await this.githubService.rateLimit();

    if (remaining < 1000) {
      throw new ForbiddenException("Rate limit exceeded");
    }

    const insightData = await this.getInsightData(id);

    try {
      const hash = `insights/${String(id)}.png`;
      const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;

      const { png } = await this.generateCardBuffer(id, insightData);

      await this.s3FileStorageService.uploadFile(png, hash, "image/png");

      this.logger.debug(`Insight ${id} did not exist in S3, generated image and uploaded to S3, redirecting`);

      return fileUrl;
    } catch (e) {
      this.logger.error(`Error generating insight card for ${id}`, e);

      throw (new NotFoundException);
    }
  }
}
