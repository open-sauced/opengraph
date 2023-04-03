import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SocialCardService } from "./social-card.service";
import { SocialCardController } from "./social-card.controller";
import { GithubModule } from "../github/github.module";

@Module({
  imports: [HttpModule, GithubModule],
  providers: [SocialCardService],
  controllers: [SocialCardController],
})
export class SocialCardModule {}
