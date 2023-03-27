import axios from "axios";
import https from "https";
import { TopicContributionEndpoint } from "../utils/types/dtos.types";

export default async function ProfileCardDataFetcher (name: string): Promise<{ langs: string[], repos: string[], img: string }> {
  const reqData = await new Promise<TopicContributionEndpoint>((resolve, reject) => {
    https
      .get(`https://beta.gs-api.opensauced.pizza/v1/*/contributions?page=1&limit=1&range=30&contributor=${name}`, resp => {
        let data = "";

        // a chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // the whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", err => {
        console.log(`Error: ${err.message}`);
        reject(err);
      });
  });

  console.log(reqData);
  const contributor = reqData.data[0];

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
