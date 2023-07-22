import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Resvg } from "@resvg/resvg-js";
import { Repository, Language } from "@octokit/graphql-schema";
import fs from "node:fs/promises";
import { firstValueFrom } from "rxjs";

import { GithubService } from "../../github/github.service";
import { S3FileStorageService } from "../../s3-file-storage/s3-file-storage.service";
import userLangs from "../templates/shared/user-langs";
import userProfileRepos from "../templates/shared/user-repos";
import tailwindConfig from "../templates/tailwind.config";
import highlightCardTemplate from "../templates/highlight-card.template";
import { DbUserHighlight } from "../../github/entities/db-user-highlight.entity";
import { DbReaction } from "../../github/entities/db-reaction.entity";
import { RequiresUpdateMeta } from "../user-card/user-card.service";
import { getIconCode, loadEmoji } from "../../utils/twemoji";

interface HighlightCardData {
  login: string;
  body: string;
  reactions: number;
  avatarUrl: string;
  repo: Repository;
  langTotal: number;
  langs: (Language & {
    size: number;
  })[];
  updated_at: Date;
  url: string;
}

@Injectable()
export class HighlightCardService {
  private readonly logger = new Logger(this.constructor.name);
  private fonts: Buffer[] = [];

  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly s3FileStorageService: S3FileStorageService,
  ) {}

  private async getHighlightData (highlightId: number): Promise<HighlightCardData> {
    const highlightReq = firstValueFrom(
      this.httpService.get<DbUserHighlight>(`${process.env.API_BASE_URL!}/v1/user/highlights/${highlightId}`),
    );

    const reactionsReq = firstValueFrom(
      this.httpService.get<DbReaction[]>(`${process.env.API_BASE_URL!}/v1/highlights/${highlightId}/reactions`),
    );

    const [highlight, highlightReactions] = await Promise.all([highlightReq, reactionsReq]);
    const { login, updated_at, url, highlight: body } = highlight.data;
    const [owner, repoName] = url.replace("https://github.com/", "").split("/");

    const repo = await this.githubService.getRepo(owner, repoName);
    const reactions = highlightReactions.data.reduce<number>((acc, curr) => acc + Number(curr.reaction_count), 0);

    const langList = repo.languages?.edges?.flatMap(edge => {
      if (edge) {
        return {
          ...edge.node,
          size: edge.size,
        };
      }
    }) as (Language & { size: number })[];

    return {
      body,
      login,
      reactions,
      avatarUrl: `https://github.com/${login}.png?size=150`,
      langs: langList,
      langTotal: repo.languages?.totalSize ?? 0,
      repo,
      updated_at: new Date(updated_at),
      url,
    };
  }

  private async getFonts () {
    if (this.fonts.length === 0) {
      const interArrayBufferReq = fs.readFile("node_modules/@fontsource/inter/files/inter-all-400-normal.woff");
      const interArrayBufferMediumReq = fs.readFile("node_modules/@fontsource/inter/files/inter-all-500-normal.woff");

      this.fonts = await Promise.all([interArrayBufferReq, interArrayBufferMediumReq]);
    }

    return this.fonts;
  }

  // public only to be used in local scripts. Not for controller direct use.
  async generateCardBuffer (highlightId: number, highlightData?: HighlightCardData) {
    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { reactions, body, avatarUrl, repo, langs, langTotal } = highlightData
      ? highlightData
      : await this.getHighlightData(highlightId);

    const template = html(
      highlightCardTemplate(avatarUrl, body, userLangs(langs, langTotal), userProfileRepos([repo], 2), reactions),
    );

    const [interArrayBuffer, interArrayBufferMedium] = await this.getFonts();

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
      loadAdditionalAsset: async (code: string, segment: string) => {
        if (code === 'emoji') {
          // if segment is an emoji
          return (
            `data:image/svg+xml;base64,` + btoa(await loadEmoji( "twemoji", getIconCode(segment)))
          )
        }
  
        // if segment is normal text
        return (code)
      },
    });

    const resvg = new Resvg(svg, { background: "rgba(238, 235, 230, .9)" });

    const pngData = resvg.render();

    return { png: pngData.asPng(), svg };
  }

  async checkRequiresUpdate (id: number): Promise<RequiresUpdateMeta> {
    const hash = `highlights/${String(id)}.png`;
    const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;
    const hasFile = await this.s3FileStorageService.fileExists(hash);

    const returnVal: RequiresUpdateMeta = {
      fileUrl,
      hasFile,
      needsUpdate: true,
      lastModified: null,
    };

    if (hasFile) {
      const lastModifiedReq = this.s3FileStorageService.getFileLastModified(hash);
      const highlightReq = this.getHighlightData(id);
      const metadataReq = this.s3FileStorageService.getFileMeta(hash);

      const [lastModified, highlight, metadata] = await Promise.all([lastModifiedReq, highlightReq, metadataReq]);

      returnVal.lastModified = lastModified;

      const { updated_at, reactions } = highlight;

      const savedReactions = metadata?.["reactions-count"] ?? "0";

      if (lastModified && lastModified > updated_at && savedReactions === String(reactions)) {
        this.logger.debug(
          `Highlight ${id} exists in S3 with lastModified: ${lastModified.toISOString()} newer than updated_at: ${updated_at.toISOString()}, and reaction count is the same, redirecting to ${fileUrl}`,
        );
        returnVal.needsUpdate = false;
      }
    }

    return returnVal;
  }

  async getHighlightCard (id: number): Promise<Buffer> {
    const { remaining } = await this.githubService.rateLimit();

    if (remaining < 1000) {
      throw new ForbiddenException("Rate limit exceeded");
    }

    const highlightData = await this.getHighlightData(id);

    try {
      const { png } = await this.generateCardBuffer(id, highlightData);

      return png;
    } catch (e) {
      this.logger.error(`Error generating highlight card for ${id}`, e);

      throw (new NotFoundException);
    }
  }
}
