import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GithubModule } from "../../github/github.module";
import { S3FileStorageModule } from "../../s3-file-storage/s3-file-storage.module";

import { InsightCardService } from "./insight-card.service";
import { InsightCardController } from "./insight-card.controller";

@Module({
  imports: [HttpModule, GithubModule, S3FileStorageModule],
  providers: [InsightCardService],
  controllers: [InsightCardController],
})
export class InsightCardModule {}
