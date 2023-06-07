const insightFooter = (contributors: string, repos: string) => `
    <div tw="flex-col" style="gap: 8px;">
      <div tw="h-48px justify-between items-center" style="gap: 8px;">
        <div tw="h-48px items-center" style="gap: 8px;">
          ${repos}
        </div>
        <div>
           <img tw="w-46px h-46px border border-white rounded" src="https://raw.githubusercontent.com/open-sauced/assets/d9a0d5a317036084aa3f5f4e20cdfbe58dc37377/svgs/slice-Orange-Gradient.svg"/>
        </div>
      </div>

      <div tw="flex-col  justify-center overflow-hidden">
        <div tw=" items-center" style="gap: -12px;">
          ${contributors}
        </div>
      </div>
    </div>
  `;

export default insightFooter;
