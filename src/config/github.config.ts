import { registerAs } from "@nestjs/config";

const GitHubConfig = registerAs("github", () => ({
  userPat: String(process.env.GITHUB_PAT_USER ?? ""),
  prPat: String(process.env.GITHUB_PAT_PR ?? ""),
  commitPat: String(process.env.GITHUB_PAT_COMMIT ?? ""),
}));

export default GitHubConfig;
