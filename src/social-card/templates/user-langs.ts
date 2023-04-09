import { Language } from "@octokit/graphql-schema";

const userLangs = (langs: (Language & { size: number })[], totalCount = 0, joinLiteral = "") =>
  langs
    .map(({ color, size }) => {
      const realPercent = size / totalCount * 100;

      return `<div tw="h-12px ${color ? `bg-[${color}]` : "bg-black"}" style="width: ${totalCount > 0 ? realPercent : 100 / langs.length}%"/>`;
    })
    .join(joinLiteral);

export default userLangs;
