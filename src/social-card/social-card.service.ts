import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Resvg } from "@resvg/resvg-js";
import { Repository, Language, User } from "@octokit/graphql-schema";
import { readFile } from "node:fs/promises";

import userLangs from "./templates/user-langs";
import userProfileRepos from "./templates/user-profile-repos";
import userProfileCard from "./templates/user-profile-card";
import { GithubService } from "../github/github.service";
import { S3FileStorageService } from "../s3-file-storage/s3-file-storage.service";
import tailwindConfig from "./templates/tailwind.config";

interface RequiresUpdateMeta {
  fileUrl: string,
  hasFile: boolean;
  needsUpdate: boolean;
  lastModified: Date | null,
}

@Injectable()
export class SocialCardService {
  private readonly logger = new Logger(this.constructor.name);

  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
    private readonly s3FileStorageService: S3FileStorageService,
  ) {}

  async getUserData (username: string): Promise<{
    id: User["databaseId"],
    name: User["name"],
    langs: (Language & {
      size: number,
    })[],
    langTotal: number,
    repos: Repository[],
    avatarUrl: string,
  }> {
    const langs: Record<string, Language & {
      size: number,
    }> = {};
    const today = (new Date);
    const today30daysAgo = new Date((new Date).setDate(today.getDate() - 30));
    const user = await this.githubService.getUser(username);
    const langRepos = user.repositories.nodes?.filter(repo => new Date(String(repo?.pushedAt)) > today30daysAgo) as Repository[];
    let langTotal = 0;

    langRepos.map(repo => {
      repo.languages?.edges?.map(edge => {
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
      id: user.databaseId,
      name: user.name,
      langs: Array.from(Object.values(langs)).sort((a, b) => b.size - a.size),
      langTotal,
      repos: user.topRepositories.nodes?.filter(repo => !repo?.isPrivate && repo?.owner.login !== username) as Repository[],
      avatarUrl: `${String(user.avatarUrl)}&size=150`,
    };
  }

  async checkRequiresUpdate (username: string): Promise<RequiresUpdateMeta> {
    const hash = `users/${String(username)}.png`;
    const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;
    const hasFile = await this.s3FileStorageService.fileExists(hash);
    const today3daysAgo = new Date((new Date).setDate((new Date).getDate() - 0.001));
    const returnVal: RequiresUpdateMeta = {
      fileUrl,
      hasFile,
      needsUpdate: true,
      lastModified: null,
    };

    if (hasFile) {
      const lastModified = await this.s3FileStorageService.getFileLastModified(hash);

      returnVal.lastModified = lastModified;

      if (lastModified && lastModified > today3daysAgo) {
        this.logger.debug(`User ${username} exists in S3 with lastModified: ${lastModified.toISOString()} less than 3 days ago, redirecting to ${fileUrl}`);
        returnVal.needsUpdate = true;
      }
    }

    return returnVal;
  }

  async getUserCard (username: string): Promise<string> {
    const { remaining } = await this.githubService.rateLimit();

    if (remaining < 1000) {
      throw new Error("Rate limit exceeded");
    }

    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { id, avatarUrl, repos, langs, langTotal } = await this.getUserData(username);
    const hash = `users/${String(id)}.png`;
    const fileUrl = `${this.s3FileStorageService.getCdnEndpoint()}${hash}`;
    const hasFile = await this.s3FileStorageService.fileExists(hash);
    const today3daysAgo = new Date((new Date).setDate((new Date).getDate() - 3));

    if (hasFile) {
      // route to s3
      const lastModified = await this.s3FileStorageService.getFileLastModified(hash);

      if (lastModified && lastModified > today3daysAgo) {
        this.logger.debug(`User ${username} exists in S3 with lastModified: ${lastModified.toISOString()} less than 3 days ago, redirecting`);
        return fileUrl;
      }
    }

    const template = html(userProfileCard(avatarUrl, username, userLangs(langs, langTotal), userProfileRepos(repos)));

    const interArrayBuffer = await readFile("node_modules/@fontsource/inter/files/inter-all-400-normal.woff");

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

    const pngBuffer = pngData.asPng();

    await this.s3FileStorageService.uploadFile(pngBuffer, hash, "image/png", { "x-amz-meta-user-id": String(id) });

    this.logger.debug(`User ${username} did not exist in S3, generated image and uploaded to S3, redirecting`);

    return fileUrl;
  }
}
