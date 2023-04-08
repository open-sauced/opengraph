import { registerAs } from "@nestjs/config";

const DigitalOceanConfig = registerAs("digitalOcean", () => ({
  accessKeyId: String(process.env.DO_SPACES_ACCESS_KEY_ID ?? ""),
  secretAccessKey: String(process.env.DO_SPACES_SECRET_ACCESS_KEY ?? ""),
  protocol: String(process.env.DO_SPACES_PROTOCOL ?? "https"),
  endpoint: String(process.env.DO_SPACES_ENDPOINT ?? "digitaloceanspaces.com"),
  region: String(process.env.DO_SPACES_REGION ?? "sfo3"),
  bucketName: String(process.env.DO_SPACES_BUCKET_NAME ?? "opengraph-dev"),
  cdnCustomDomain: String(process.env.DO_SPACES_SUBDOMAIN ?? ""),
  cdnDisabled: !!process.env.DO_SPACES_CDN_DISABLED,
}));

export default DigitalOceanConfig;
