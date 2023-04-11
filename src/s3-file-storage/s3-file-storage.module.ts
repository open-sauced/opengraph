import { Module } from "@nestjs/common";

import { S3FileStorageService } from "./s3-file-storage.service";

@Module({
  imports: [],
  providers: [S3FileStorageService],
  exports: [S3FileStorageService],
})
export class S3FileStorageModule {}
