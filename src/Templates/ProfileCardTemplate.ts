import axios from "axios";
import { readFile } from "fs/promises";
import RepoIconWithName from "./components/RepoIconWithName";
import colors from "../utils/color.json"
import { TopicContributionEndpoint } from "../utils/types/dtos.types";

export default async function ProfileCardTemplate (name: string) {
  const file = await readFile("public/templates/UserProfile.html");

  let string = file.toString("utf-8");

  // This request is causing a big delay in the image generation
  const langListRequest = await axios<TopicContributionEndpoint>(`https://beta.gs-api.opensauced.pizza/v1/*/contributions?page=1&limit=1&range=30&contributor=${name}`)
  const contributor = langListRequest.data.data[0]

  if(contributor.langs) {
    const langList = contributor.langs.split(',')
    const langElementList = (langListRequest.data.data[0].langs || "").split(',').map((lang) => {
      const colorKey = Object.keys(colors).find(key => key.toLowerCase() === lang.toLowerCase());
      const color = colorKey? colors[colorKey as keyof typeof colors].color : '#000';
      return `
        <div style="
          width: ${Math.round(100 / langList.length)}%;
          height: 10.5px;
          background: ${color};
        "/>
      `
    })

    string = string.replace(/{{langs}}/g, langElementList.join(''));
  }


  if(contributor.recent_repo_list) {
    const repoList = (contributor.recent_repo_list || "").split(",").map((repo) => {
      const [repoOwner, repoName] = repo.split("/");
      const repoIcon = `https://www.github.com/${repoOwner}.png?size=460`
      return RepoIconWithName(repoName, repoIcon)
    });

    let output = repoList.slice(0, 2).join('');
    if(repoList.length > 2) {
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
      `
    }

    string = string.replace(/{{repos}}/g, output);
  }

  string = string.replace(/{{name}}/g, name);

  return string;
}
