import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { S3, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createHash } from "node:crypto";
import { Readable } from "node:stream";

import DigitalOceanConfig from "../config/digital-ocean.config";

@Injectable()
export class S3FileStorageService {
  private readonly s3Client: S3Client;

  constructor (
    @Inject(DigitalOceanConfig.KEY)
    private readonly config: ConfigType<typeof DigitalOceanConfig>,
  ) {
    this.s3Client = new S3({
      forcePathStyle: false,
      endpoint: config.endpoint,
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  generateFileUrl (hash: string): string {
    return `https://${this.config.bucketName}.${this.config.endpoint.replace(/https?:\/\//, "")}/${hash}`;
  }

  async fileExists (hash: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.config.bucketName,
          Key: hash,
        }),
      );
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "NotFound") {
          return false;
        }
      }

      throw error;
    }
  }

  async getFileLastModified (hash: string): Promise<Date | null> {
    try {
      const response = await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.config.bucketName,
          Key: hash,
        }),
      );

      return response.LastModified ?? null;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        if (error.name === "NotFound") {
          return null;
        }
      }

      throw error;
    }
  }

  async uploadFile (
    fileContent: Buffer | Readable,
    hash: string,
    contentType: string,
  ): Promise<void> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: hash,
        Body: fileContent,
        ContentType: contentType,
        ACL: "public-read",
      }),
    );
  }

  generateHash (content: Buffer): string {
    return createHash("sha256").update(content)
      .digest("hex");
  }
}
