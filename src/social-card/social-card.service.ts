import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

import userLangs from "./templates/user-langs";
import userProfileRepos from "./templates/user-profile-repos";
import userProfileCard from "./templates/user-profile-card";
import { GithubService } from "../github/github.service";
import { Repository } from "@octokit/graphql-schema";

@Injectable()
export class SocialCardService {
  constructor (
    private readonly httpService: HttpService,
    private readonly githubService: GithubService,
  ) {}

  async getUserData (username: string): Promise<{
    langs: string[],
    repos: Repository[],
    avatarUrl: string,
  }> {
    const user = await this.githubService.getUser(username);

    /*
     * console.log(user);
     * console.log(user.repositories.nodes);
     */

    return {
      langs: [],
      repos: user.topRepositories.nodes as Repository[],
      avatarUrl: `${String(user.avatarUrl)}&size=150`,
    };
  }

  async getUserCard (username: string): Promise<Buffer> {
    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { avatarUrl, repos, langs } = await this.getUserData(username);

    const template = html(userProfileCard(avatarUrl, username, userLangs(langs), userProfileRepos(repos)));

    const robotoArrayBuffer = await readFile("public/Roboto-Regular.ttf");
    const svg = await satori(template, {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: "Roboto",
          data: robotoArrayBuffer,
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
