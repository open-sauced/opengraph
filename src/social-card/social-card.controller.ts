import {Controller, Get, Header, Param, Req, Res, StreamableFile} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { createReadStream } from "node:fs";
import { Readable } from 'stream';

import { SocialCardService } from "./social-card.service";

@Controller('users')
export class SocialCardController {
  constructor(
    private readonly socialCardService: SocialCardService
  ) {}

  @Get("/:username")
  @Header('Content-Type', 'image/png')
  @ApiOperation({
    operationId: "generateUserSocialCard",
    summary: "Gets latest cache aware social card link for :username or generates a new one",
  })
  // @ApiOkResponse({ type: String })
  @ApiNotFoundResponse({ description: "User not found" })
  async generateUserSocialCard (
    @Param("username") username: string,
  ): Promise<StreamableFile> {
    const image = await this.socialCardService.getUserCard(username);

    console.log(image);

    return new StreamableFile(image);
  }
}
