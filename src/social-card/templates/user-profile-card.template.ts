import cardFooter from "./shared/card-footer";
import cardStyleSetup from "./shared/card-style-setup";

const userProfileCardTemplate = (avatarUrl: string, name: string, langs: string, repos: string): string => `
  ${cardStyleSetup}

  <div tw="flex-col justify-between rounded-2xl pt-48px bg-white w-1200px h-627px">
    <div tw="flex-col justify-between w-full bg-white px-32px ">
      <div tw="justify-between items-center" style="gap: 16px;">
        <h1 tw="h-134px font-medium text-96px leading-134px text-zinc-900 tracking-tight" style="width: 926px;">
          ${name}
        </h1>
        <img tw="w-134px h-134px border border-sauced-orange rounded-full" src="${avatarUrl}"/>
      </div>


    </div>
    ${cardFooter(langs, repos)}
  </div>`;

export default userProfileCardTemplate;
