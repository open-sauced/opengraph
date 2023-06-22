import cardStyleSetup from "./shared/card-style-setup";
import insightFooter from "./shared/insight-footer";

const insightCardTemplate = (pageName: string, contributors: string, repos: string): string => `
  ${cardStyleSetup}

  <div tw="flex-col justify-between w-1200px h-627px bg-white rounded-2xl p-32px pt-48px">
    <div tw="">
      <div tw="w-full flex-col flex-nowrap" style="gap: -10px;">
        <h1 tw="font-medium text-72px leading-72px text-zinc-900 tracking-tight" style="width: 100%;">
          OpenSauced Insights
        </h1>
        <p tw="font-medium text-48px tracking-tight"> ${pageName}: Insights </p>
      </div>
    </div>
    ${insightFooter(contributors, repos)}
  </div>`;

export default insightCardTemplate;
