import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { UserCardService } from "./user-card.service";
import { UserCardController } from "./user-card.controller";
import { GithubModule } from "../../github/github.module";
import { S3FileStorageModule } from "../../s3-file-storage/s3-file-storage.module";

@Module({
  imports: [HttpModule, GithubModule, S3FileStorageModule],
  providers: [UserCardService],
  controllers: [UserCardController],
})
export class UserCardModule {}
