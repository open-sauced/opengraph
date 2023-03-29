import repoIconWithName from "./repo-icon-with-name";

const userProfileRepos = (repos: string[]): string => {
  const repoList = repos.map(repo => {
    const [repoOwner, repoName] = repo.split("/");
    const repoIcon = `https://www.github.com/${repoOwner}.png?size=460`;

    return repoIconWithName(repoName, repoIcon);
  })

  return `${repoList.join("")}${repoList.length > 2 && `<h2 style="
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
      </h2>`}`;
}

export default userProfileRepos;
