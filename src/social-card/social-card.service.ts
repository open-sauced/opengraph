import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

import userLangs from "./templates/user-langs";
import userProfileRepos from "./templates/user-profile-repos";
import userProfileCard from "./templates/user-profile-card";
import { GithubService } from "../github/github.service";
import { Repository, Language, User } from "@octokit/graphql-schema";

@Injectable()
export class SocialCardService {
  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
  ) {}

  async getUserData (username: string): Promise<{
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
      name: user.name,
      langs: Array.from(Object.values(langs)),
      langTotal,
      repos: user.topRepositories.nodes?.filter(repo => !repo?.isPrivate && repo?.owner.login !== username) as Repository[],
      avatarUrl: `${String(user.avatarUrl)}&size=150`,
    };
  }

  async getUserCard (username: string): Promise<Buffer> {
    const { remaining } = await this.githubService.rateLimit();

    if (remaining < 1000) {
      throw new Error("Rate limit exceeded");
    }

    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { name, avatarUrl, repos, langs, langTotal } = await this.getUserData(username);

    const template = html(userProfileCard(avatarUrl, name!, userLangs(langs, langTotal), userProfileRepos(repos)));

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
    });

    const resvg = new Resvg(svg, { background: "rgba(238, 235, 230, .9)" });

    const pngData = resvg.render();

    const pngBuffer = pngData.asPng();

    return pngBuffer;
  }
}
