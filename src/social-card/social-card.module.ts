import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { SocialCardService } from "./social-card.service";
import { SocialCardController } from "./social-card.controller";
import { GithubModule } from "../github/github.module";
import { S3FileStorageModule } from "../s3-file-storage/s3-file-storage.module";

@Module({
  imports: [HttpModule, GithubModule, S3FileStorageModule],
  providers: [SocialCardService],
  controllers: [SocialCardController],
})
export class SocialCardModule {}
