import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { S3, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";

import DigitalOceanConfig from "../config/digital-ocean.config";

@Injectable()
export class S3FileStorageService {
  private readonly s3Client: S3Client;

  public getOriginEndpoint = (): string => `${this.config.protocol}://${this.config.bucketName}.${this.config.region}.${this.config.endpoint}/`;

  public getCdnEndpoint = (): string => (this.config.cdnDisabled
    ? this.getOriginEndpoint()
    : `${this.config.protocol}://${this.config.cdnCustomDomain !== "" ? this.config.cdnCustomDomain : `${this.config.bucketName}.${this.config.region}.cdn.${this.config.endpoint}`}/`);

  constructor (
    @Inject(DigitalOceanConfig.KEY)
    private readonly config: ConfigType<typeof DigitalOceanConfig>,
  ) {
    this.s3Client = new S3({
      forcePathStyle: false,
      endpoint: `${config.protocol}://${config.region}.${config.endpoint}`,
      region: `us-east-1`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
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
      if (error instanceof Error) {
        if (error.name === "NotFound") {
          return null;
        }
      }

      throw error;
    }
  }

  async getFileMeta (hash: string): Promise<Record<string, string> | null> {
    try {
      const response = await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.config.bucketName,
          Key: hash,
        }),
      );

      return response.Metadata ?? null;
    } catch (error) {
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
    metadata?: Record<string, string>,
  ): Promise<void> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: hash,
        Body: fileContent,
        ContentType: contentType,
        ACL: "public-read",
        Metadata: metadata,
      }),
    );
  }
}
