import cardFooter from "./shared/card-footer";
import cardStyleSetup from "./shared/card-style-setup";

const highlightCardTemplate = (avatarUrl: string, title: string, body: string, langs: string, repos: string, reactions: number): string => `
  ${cardStyleSetup}

  <div tw="flex-col justify-between w-1200px h-627px bg-white rounded-2xl p-32px pt-48px">
    <div style="gap: 16px;">
      <div tw="p-2.5 pt-5" style="gap: 10px;">
        <img tw="w-132px h-132px border border-sauced-orange rounded-full" src="${avatarUrl}"/>
      </div>

      <div tw="w-906px flex-col flex-nowrap" style="gap: -10px;">
        <h1 tw="font-medium text-72px leading-72px text-zinc-900 tracking-tight" style="width: 926px;">
          ${title}
        </h1>
        <p tw="font-normal text-48px text-light-slate-11 tracking-tight">
          ${body.length > 108 ? `${body.slice(0, 108)}...` : body}
        </p>
      </div>

      <div>
        <img tw="w-46px h-46px border border-white rounded" src="https://raw.githubusercontent.com/open-sauced/assets/d9a0d5a317036084aa3f5f4e20cdfbe58dc37377/svgs/slice-Orange-Gradient.svg"/>
      </div>
    </div>

    ${cardFooter(langs, repos, reactions)}
  </div>`;

export default highlightCardTemplate;
