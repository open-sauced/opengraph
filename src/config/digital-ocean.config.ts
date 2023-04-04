import { registerAs } from "@nestjs/config";

const DigitalOceanConfig = registerAs("digitalOcean", () => ({
  endpoint: String(process.env.DIGITAL_OCEAN_ENDPOINT ?? "https://sfo3.digitaloceanspaces.com"),
  region: String(process.env.DIGITAL_OCEAN_REGION ?? "us-east-1"),
  accessKeyId: String(process.env.DIGITAL_OCEAN_ACCESS_KEY_ID ?? ""),
  secretAccessKey: String(process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY ?? ""),
  bucketName: String(process.env.DIGITAL_OCEAN_BUCKET_NAME ?? "opengraph-dev"),
}));

export default DigitalOceanConfig;
