import { readFile } from "node:fs/promises";
import { default as satori } from "satori";
import { Resvg } from "@resvg/resvg-js";
import HTMLTemplate from "./HTMLTemplate";

export default async function createImage (name: string) {
  const { html } = await import("satori-html");

  const template = html(HTMLTemplate(name));

  const robotoArrayBuffer = await readFile("public/Roboto-Regular.ttf");
  const svg = await satori(template, {
    width: 600,
    height: 400,
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
