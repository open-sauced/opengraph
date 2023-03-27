import { https } from "follow-redirects";
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
          resolve(JSON.parse(data) as TopicContributionEndpoint);
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

  const langs = contributor.langs ? contributor.langs.split(",") : [];
  const repos = contributor.recent_repo_list ? contributor.recent_repo_list.split(",") : [];

  const imgReqData = await new Promise<string>((resolve, reject) => {
    https
      .get(`https://www.github.com/${name}.png?size=300`, res => {
        const data: Uint8Array[] = [];

        res.on("data", d => {
          data.push(d as Uint8Array);
          console.log("chunk");
        });
        res.on("end", () => {
          const buffer = Buffer.concat(data);
          const base64String = buffer.toString("base64");

          resolve(base64String);
        });
      })
      .on("error", err => {
        console.log(`Error: ${err.message}`);
        reject(err);
      });
  });

  const img = `data:image/jpeg;base64,${imgReqData}`;
  
  return {
    langs,
    repos,
    img,
  };
}
