import cardFooter from "./shared/card-footer";
import cardStyleSetup from "./shared/card-style-setup";

const highlightCardTemplate = (
  avatarUrl: string,
  login: string,
  langs: string,
  repos: string,
  reactions: number,
): string => `
  ${cardStyleSetup}

  <div tw="flex-col justify-between bg-white w-1200px h-627px">
    <div tw="flex-col justify-between w-full overflow-hidden pt-48px px-32px">
      <div tw="flex-row justify-between" style="gap: 16px;">
        <div tw="w-906px flex-col flex-nowrap" style="gap: -10px;">
          <h1 tw="text-72px leading-72px text-black tracking-tight" style="width: 926px; font-weight: 500;">
               OpenSauced Highlight
          </h1>
          <p tw="font-normal text-48px text-light-slate-11 tracking-tight">
             ${login}
          </p>
        </div>
        <div>
          <img tw="w-132px h-132px border border-sauced-orange rounded-full" src="${avatarUrl}"/>
        </div>
      </div>


    </div>
    ${cardFooter(langs, repos, reactions)}
  </div>`;

export default highlightCardTemplate;
