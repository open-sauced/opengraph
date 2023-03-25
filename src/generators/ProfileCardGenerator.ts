import { readFile } from "fs/promises";
import RepoIconWithName from "./components/RepoIconWithName";
import colors from "../utils/color.json";

export default async function ProfileCardGenerator (name: string, langs: string[], repos: string[], img: string) {
  const file = await readFile("src/generators/templates/ProfileCard.html");

  let string = file.toString("utf-8");

  const langElementList = langs.map(lang => {
    const colorKey = Object.keys(colors).find(key => key.toLowerCase() === lang.toLowerCase());
    const color = colorKey ? colors[colorKey as keyof typeof colors].color ?? "#000" : "#000";

    return `
      <div style="
        width: ${Math.round(100 / langs.length)}%;
        height: 10.5px;
        background: ${color};
      "/>
    `;
  });

  string = string.replace(/{{langs}}/g, langElementList.join(""));

  const repoList = repos.map(repo => {
    const [repoOwner, repoName] = repo.split("/");
    const repoIcon = `https://www.github.com/${repoOwner}.png?size=460`;

    return RepoIconWithName(repoName, repoIcon);
  });

  let output = repoList.slice(0, 2).join("");

  if (repoList.length > 2) {
    output += `
      <h2 style="
        width: 39px;
        height: 37px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 115%;
        letter-spacing: -0.02em;
        color: #687076;
      ">
          +${repoList.length - 2}
      </h2>
    `;
  }

  string = string.replace(/{{repos}}/g, output);

  string = string.replace(/{{name}}/g, name);

  string = string.replace(/{{img}}/g, img);

  return string;
}
