import axios from "axios";
import { TopicContributionEndpoint } from "../utils/types/dtos.types";

export default async function ProfileCardDataFetcher (name: string): Promise<{ langs: string[], repos: string[], img: string }> {
  const req = await axios<TopicContributionEndpoint>(`https://beta.gs-api.opensauced.pizza/v1/*/contributions?page=1&limit=1&range=30&contributor=${name}`);

  console.log(req.data);
  const contributor = req.data.data[0];
  
  // could be undefined if array is empty
  if (!contributor) {
    throw new Error(`User '${name}' Not Found`);
  }

  const langs = (contributor.langs || "").split(",");
  const repos = (contributor.recent_repo_list || "").split(",");

  const imgReq = await axios.get<ArrayBuffer>(`https://www.github.com/${name}.png?size=300`, { responseType: "arraybuffer" });
  const img = `data:image/jpeg;base64,${Buffer.from(imgReq.data).toString("base64")}`;

  return {
    langs,
    repos,
    img,
  };
}
