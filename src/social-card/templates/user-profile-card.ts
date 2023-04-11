const userProfileCard = (avatarUrl: string, name: string, langs: string, repos: string): string => `
  <style>
    div {
      display: flex;
    }
  </style>

  <div tw="flex-col justify-between w-1200px h-627px bg-white rounded-2xl p-32px pt-48px">
    <div style="gap: 16px;">
      <img tw="w-134px h-134px border border-sauced-orange rounded-full" src="${avatarUrl}"/>

      <h1 tw="h-134px font-medium text-96px leading-134px text-zinc-900 tracking-tight" style="width: 926px;">
        ${name}
      </h1>

      <img tw="w-48px h-48px border border-white rounded" src="https://raw.githubusercontent.com/open-sauced/assets/d9a0d5a317036084aa3f5f4e20cdfbe58dc37377/svgs/slice-Orange-Gradient.svg"/>
    </div>

    <div tw="flex-col" style="gap: 8px;">
      <div tw="h-48px items-center" style="gap: 8px;">
        ${repos}
      </div>

      <div tw="flex-col h-18px justify-center">
        <div tw="h-12px" style="gap: 4px;">
          ${langs}
        </div>
      </div>
    </div>
  </div>`;

export default userProfileCard;
