import fs from 'fs';
// @ts-ignore
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import HTMLTemplate from './HTMLTemplate';

const html = async (...args: string[]) => {
  const { html } = await import('satori-html');
  // @ts-ignore
  return html(...args);
}

export default async function createImage(name: string) {
  const template = await html(HTMLTemplate(name))
  
  let robotoArrayBuffer = fs.readFileSync('public/Roboto-Regular.ttf');
  const svg = await satori(template , {
      width: 600,
      height: 400,
      fonts: [
        {
          name: 'Roboto',
          data: robotoArrayBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )

  const resvg = new Resvg(svg, {
    background: "rgba(238, 235, 230, .9)",
  });

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()
  
  return pngBuffer
}