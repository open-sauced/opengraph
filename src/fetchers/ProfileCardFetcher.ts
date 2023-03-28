import { TopicContributionEndpoint } from "../utils/types/dtos.types";

export default async function ProfileCardDataFetcher (name: string): Promise<{ langs: string[], repos: string[], img: string }> {
  const req = await fetch(`https://beta.gs-api.opensauced.pizza/v1/*/contributions?page=1&limit=1&range=30&contributor=${name}`);
  const reqData = await req.json() as TopicContributionEndpoint;

  console.log(reqData);
  const contributor = reqData.data[0];

  // could be undefined if array is empty
  if (!contributor) {
    throw new Error(`User '${name}' Not Found`);
  }

  const langs = contributor.langs ? contributor.langs.split(",") : [];
  const repos = contributor.recent_repo_list ? contributor.recent_repo_list.split(",") : [];

  const imgReq = await fetch(`https://www.github.com/${name}.png?size=300`);
  const imgReqBody = await imgReq.blob();

  const img = URL.createObjectURL(imgReqBody);

  return {
    langs,
    repos,
    img,
  };
}
