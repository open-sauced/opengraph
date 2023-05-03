import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Resvg } from "@resvg/resvg-js";
import { Repository, Language } from "@octokit/graphql-schema";
import fs from "node:fs/promises";

import { GithubService } from "../../github/github.service";
import { S3FileStorageService } from "../../s3-file-storage/s3-file-storage.service";
import userLangs from "../templates/shared/user-langs";
import userProfileRepos from "../templates/shared/user-repos";
import tailwindConfig from "../templates/tailwind.config";
import { firstValueFrom } from "rxjs";
import highlightCardTemplate from "../templates/highlight-card.template";
import RequiresUpdateMeta from "../../../typings/RequiresUpdateMeta";

interface HighlightCardData {
  title: string,
  body: string,
  reactions: number,
  avatarUrl: string,
  repos: Repository[],
  langTotal: number,
  langs: (Language & {
    size: number,
  })[],
}

@Injectable()
export class HighlightCardService {
  private readonly logger = new Logger(this.constructor.name);

  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly s3FileStorageService: S3FileStorageService,
  ) {}

  private async getHighlightData (highlightId: number): Promise<HighlightCardData> {
    const langs: Record<string, Language & {
      size: number,
    }> = {};
    const today = (new Date);
    const today30daysAgo = new Date((new Date).setDate(today.getDate() - 30));

    const highlightReq = await firstValueFrom(this.httpService.get<DbHighlight>(`https://api.opensauced.pizza/v1/user/highlights/${highlightId}`));
    const { login, title, highlight: body } = highlightReq.data;

    const reactionsReq = await firstValueFrom(this.httpService.get<DbReaction[]>(`https://api.opensauced.pizza/v1/highlights/${highlightId}/reactions`));
    const reactions = reactionsReq.data.reduce<number>( (acc, curr) => acc + Number(curr.reaction_count), 0);

    const user = await this.githubService.getUser(login);
    const langRepos = user.repositories.nodes?.filter(repo => new Date(String(repo?.pushedAt)) > today30daysAgo) as Repository[];
    let langTotal = 0;

    langRepos.forEach(repo => {
      repo.languages?.edges?.forEach(edge => {
        if (edge?.node.id) {
          langTotal += edge.size;

          if (!Object.keys(langs).includes(edge.node.id)) {
            langs[edge.node.id] = {
              ...edge.node,
              size: edge.size,
            };
          } else {
            langs[edge.node.id].size += edge.size;
          }
        }
      });
    });

    return {
      title,
      body,
      reactions,
      avatarUrl: `${String(user.avatarUrl)}&size=150`,
      langs: Array.from(Object.values(langs)).sort((a, b) => b.size - a.size),
      langTotal,
      repos: user.topRepositories.nodes?.filter(repo => !repo?.isPrivate && repo?.owner.login !== login) as Repository[],
    };
  }

  // public only to be used in local scripts. Not for controller direct use.
  async generateCardBuffer (highlightId: number, highlightData?: HighlightCardData) {
    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { title, body, reactions, avatarUrl, repos, langs, langTotal } = highlightData ? highlightData : await this.getHighlightData(highlightId);

    const template = html(highlightCardTemplate(avatarUrl, title, body, userLangs(langs, langTotal), userProfileRepos(repos, 2), reactions));

    const interArrayBuffer = await fs.readFile("node_modules/@fontsource/inter/files/inter-all-400-normal.woff");

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
      ],
      tailwindConfig,
    });

    const resvg = new Resvg(svg, { background: "rgba(238, 235, 230, .9)" });

    const pngData = resvg.render();

    return { png: pngData.asPng(), svg };
  }

  async checkRequiresUpdate (id: number): Promise<RequiresUpdateMeta> {
    const hash = `highlights/${String(id)}.png`;
    const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;
    const hasFile = await this.s3FileStorageService.fileExists(hash);
    const today1daysAgo = new Date((new Date).setDate((new Date).getDate() - 1));
    const returnVal: RequiresUpdateMeta = {
      fileUrl,
      hasFile,
      needsUpdate: true,
      lastModified: null,
    };

    if (hasFile) {
      const lastModified = await this.s3FileStorageService.getFileLastModified(hash);

      returnVal.lastModified = lastModified;

      if (lastModified && lastModified > today1daysAgo) {
        this.logger.debug(`Highlight ${id} exists in S3 with lastModified: ${lastModified.toISOString()} less than 1 days ago, redirecting to ${fileUrl}`);
        returnVal.needsUpdate = false;
      }
    }

    return returnVal;
  }

  async getHighlightCard (id: number): Promise<string> {
    const { remaining } = await this.githubService.rateLimit();

    if (remaining < 1000) {
      throw new ForbiddenException("Rate limit exceeded");
    }

    const highlightData = await this.getHighlightData(id);

    try {
      const hash = `highlights/${String(id)}.png`;
      const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;

      const { png } = await this.generateCardBuffer(id, highlightData);

      await this.s3FileStorageService.uploadFile(png, hash, "image/png", { "x-amz-meta-user-id": String(id) });

      this.logger.debug(`Highlight ${id} did not exist in S3, generated image and uploaded to S3, redirecting`);

      return fileUrl;
    } catch (e) {
      this.logger.error(`Error generating highlight card for ${id}`, e);

      throw (new NotFoundException);
    }
  }
}
