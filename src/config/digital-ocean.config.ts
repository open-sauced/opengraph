import { registerAs } from "@nestjs/config";

const DigitalOceanConfig = registerAs("digitalOcean", () => ({
  endpoint: String(process.env.DO_SPACES_ENDPOINT ?? "https://sfo3.digitaloceanspaces.com"),
  region: String(process.env.DO_SPACES_REGION ?? "us-east-1"),
  accessKeyId: String(process.env.DO_SPACES_ACCESS_KEY_ID ?? ""),
  secretAccessKey: String(process.env.DO_SPACES_SECRET_ACCESS_KEY ?? ""),
  bucketName: String(process.env.DO_SPACES_BUCKET_NAME ?? "opengraph-dev"),
}));

export default DigitalOceanConfig;
