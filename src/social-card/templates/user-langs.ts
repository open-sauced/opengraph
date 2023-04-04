import { Language } from "@octokit/graphql-schema";

const userLangs = (langs: (Language & {
  size: number,
})[], totalCount = 0, joinLiteral = "") => langs.map(({ color, size }) => `
    <div style="
      width: ${totalCount > 0 ? Math.round( size / totalCount * 100) : 100 / langs.length}%;
      height: 11px;
      background: ${color ?? "#000"};
    "/>`).join(joinLiteral);

export default userLangs;
