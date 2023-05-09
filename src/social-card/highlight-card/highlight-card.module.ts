import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GithubModule } from "../../github/github.module";
import { S3FileStorageModule } from "../../s3-file-storage/s3-file-storage.module";
import { HighlightCardService } from "../highlight-card/highlight-card.service";
import { HighlightCardController } from "./highlight-card.controller";

@Module({
  imports: [HttpModule, GithubModule, S3FileStorageModule],
  providers: [HighlightCardService],
  controllers: [HighlightCardController],
})
export class HighlightCardModule {}
