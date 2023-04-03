import repoIconWithName from "./repo-icon-with-name";
import { Repository } from "@octokit/graphql-schema";

const userProfileRepos = (repos: Repository[]): string => {
  const repoList = repos.map(({ name, owner: { avatarUrl } }) => repoIconWithName(`${name.substring(0, 15)}${name.length > 15 ? "..." : ""}`, `${String(avatarUrl)}&size=40`));

  return `${repoList.slice(0, 3).join("")}${repoList.length > 3
    ? `<h2 style="
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
      </h2>`
    : ``}`;
};

export default userProfileRepos;
