import { Language } from "@octokit/graphql-schema";

const userLangs = (langs: (Language & { size: number })[], totalCount = 0, joinLiteral = "") => {
  const filteredLangs = langs
    .filter(({ size }) => size > 0 && (size / totalCount) * 100 >= 0.5);

  return filteredLangs
    .map(({ color, size }) => {
      const realPercent = size / totalCount * 100;

      return `<div tw="h-12px ${color ? `bg-[${color}]` : "bg-black"}" style="width: ${totalCount > 0 ? realPercent : 100 / filteredLangs.length}%"/>`;
    })
    .join(joinLiteral);
};

export default userLangs;
