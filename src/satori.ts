import { readFile } from "node:fs/promises";

// @ts-expect-error - satori doesnt have types
import { default as satori } from "satori";
import { Resvg } from "@resvg/resvg-js";
import ProfileCardTemplate from "./Templates/ProfileCardTemplate";

export default async function createImage (name: string) {
  // based on the design of: User Profile Card - Linkedin Content Images - 1200x627

  const { html } = await import("satori-html");
  const template = html(await ProfileCardTemplate(name));

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
