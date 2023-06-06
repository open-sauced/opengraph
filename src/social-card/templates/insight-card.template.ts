import cardStyleSetup from "./shared/card-style-setup";
import repoIconWithName from "./shared/repo-icon-with-name";
const insightCardTemplate = (
  pageName: string,
  contributors: string[],
  repos: { repoName: string; avatarUrl: string }[],
): string => `
  ${cardStyleSetup}

  <div tw="flex-col justify-between w-1200px h-627px bg-white rounded-2xl p-32px pt-48px">
    <div tw="px-8 ">
      <div tw="w-full flex-col flex-nowrap" style="gap: -10px;">
        <h1 tw="font-medium text-72px leading-72px text-zinc-900 tracking-tight" style="width: 100%;">
          ${pageName}: Insights
        </h1>
      </div>
    </div>
    <div>
      ${
  repos.length > 0
    ? repos.map(({ repoName, avatarUrl }) => `${repoIconWithName(repoName, avatarUrl)}`).join("")
    : ""
}
    </div>
    <div tw="justify-between ">
      <div tw="-space-x-3 w-max">
        ${contributors
    .map(
      contributor =>
        `<div tw="w-8 h-8 overflow-hidden rounded-full border-2 border-solid border-white "><img tw="w-132px h-132px border border-sauced-orange rounded-full" src="${contributor}"/><div>`,
    )
    .join("")} ${
  contributors.length > 3
    ? `<h2 tw="m-0 font-medium text-32px leading-32px text-zinc-900">+${contributors.length - 3}</h2>`
    : ""
}
      </div>

      <div>
        <img tw="w-46px h-46px border border-white rounded" src="https://raw.githubusercontent.com/open-sauced/assets/d9a0d5a317036084aa3f5f4e20cdfbe58dc37377/svgs/slice-Orange-Gradient.svg"/>
      </div>
    </div>
  </div>`;

export default insightCardTemplate;
