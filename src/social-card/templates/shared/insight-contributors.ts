const insightContributors = (contributors: string[]): string => {
  const repoList = contributors.map(
    contributor => `<img tw="w-46px h-46px border-2 border-white rounded-full" src="${String(contributor)}" />`,
  );

  return `${repoList.slice(0, 5).join("")}${
    repoList.length > 5
      ? `<h2 tw="ml-4 font-medium items-center text-32px leading-32px text-zinc-500" style="display: flex;">+${
        repoList.length - 5
      }</h2>`
      : ``
  }`;
};

export default insightContributors;
