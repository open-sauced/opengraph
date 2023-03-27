import { readFile } from "node:fs/promises";

import { default as satori } from "satori";
import { Resvg } from "@resvg/resvg-js";
import ProfileCardGenerator from "../generators/ProfileCardGenerator";
import { Request, Response } from "express";
import ProfileCardDataFetcher from "../fetchers/ProfileCardFetcher";

export default async function profileCardHandler (req: Request, res: Response) {
  const { name } = req.params;


  // based on the design of: User Profile Card - Linkedin Content Images - 1200x627
  let data: Awaited<ReturnType<typeof ProfileCardDataFetcher>>;

  try {
    data = await ProfileCardDataFetcher(name);
  } catch (error) {
    const { message } = error as Error;

    console.error(`Missing data: ${message}`);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(message);
    return;
  }

  const { langs, repos, img } = data;

  res.writeHead(201, { "Content-Type": "image/png" });

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
