import repoIconWithName from "./repo-icon-with-name";
import { Repository } from "@octokit/graphql-schema";

const userProfileRepos = (repos: Repository[], limit: number): string => {
  const charLimit = limit === 1 ? 60 : repos.length === 1 ? 60 : 15;
  const repoList = repos.map(({ name, owner: { avatarUrl } }) =>
    repoIconWithName(`${name.substring(0, charLimit).replace(/\.+$/, "")}${name.length > charLimit ? "..." : ""}`, `${String(avatarUrl)}&size=40`));

  return `${repoList.slice(0, limit).join("")}${repoList.length > limit
    ? `<h2 tw="m-0 font-medium text-32px leading-32px text-zinc-900">+${repoList.length - limit}</h2>`
    : ``}`;
};

export default userProfileRepos;
