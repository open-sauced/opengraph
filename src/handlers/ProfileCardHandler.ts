import { readFile } from "node:fs/promises";

import { default as satori } from "satori";
import { Resvg } from "@resvg/resvg-js";
import ProfileCardGenerator from "../generators/ProfileCardGenerator";
import { Request, Response } from "express";
import ProfileCardDataFetcher from "../fetchers/ProfileCardFetcher";

export default async function profileCardHandler (req: Request, res: Response) {
  const { name } = req.params;

  res.writeHead(201, { "Content-Type": "image/png" });

  // based on the design of: User Profile Card - Linkedin Content Images - 1200x627
  const { langs, repos, img } = await ProfileCardDataFetcher(name);

  const { html } = await import("satori-html");


  const template = html(await ProfileCardGenerator(name, langs, repos, img));

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

  res.end(pngBuffer);
}
