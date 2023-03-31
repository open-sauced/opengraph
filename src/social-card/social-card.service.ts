import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { readFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";

import userLangs from "./templates/user-langs";
import userProfileRepos from "./templates/user-profile-repos";
import userProfileCard from "./templates/user-profile-card";

@Injectable()
export class SocialCardService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getUserData(username: string): Promise<{
    langs: string[],
    repos: string[],
    img: string,
  }> {
    const request= this.httpService
      .get(`https://beta.gs-api.opensauced.pizza/v1/*/contributions?page=1&limit=1&range=30&contributor=${username}`)
      .pipe(
        map((res) => res.data),
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }
      ));

    const { data } = await firstValueFrom(request);

    const contributor = data[0];

    if (!contributor) {
      throw new Error(`User '${username}' Not Found`);
    }

    const langs = contributor.langs ? contributor.langs.split(",") : [];
    const repos = contributor.recent_repo_list ? contributor.recent_repo_list.split(",") : [];

    const imgReq = this.httpService
      .get(`https://www.github.com/${username}.png?size=300`, {
        responseType: 'text',
        responseEncoding: 'base64'
      })
      .pipe(
        catchError((err) => {
            console.log(err);
            return throwError(err);
          }
        ));

    const { data: img } = await firstValueFrom(imgReq);

    return {
      langs,
      repos,
      img,
    };
  }

  async getUserCard(username: string): Promise<Buffer> {
    const { html } = await import("satori-html");
    const satori = (await import("satori")).default;

    const { img, repos, langs } = await this.getUserData(username);

    const template = html(userProfileCard(img, username, userLangs(langs), userProfileRepos(repos)));

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
