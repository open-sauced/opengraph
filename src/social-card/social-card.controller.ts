import { Controller, Get, Header, Param, Redirect, StreamableFile } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { SocialCardService } from "./social-card.service";

@Controller("users")
@ApiTags("User social cards")
export class SocialCardController {
  constructor (
    private readonly socialCardService: SocialCardService,
  ) {}

  @Get("/:username")
  @ApiOperation({
    operationId: "generateUserSocialCard",
    summary: "Gets latest cache aware social card link for :username or generates a new one",
  })
  @Header("Content-Type", "image/png")
  @ApiOkResponse({ type: StreamableFile })
  @ApiNotFoundResponse({ description: "User not found" })
  @Redirect()
  async generateUserSocialCard (
    @Param("username") username: string,
  ): Promise<{ url: string }> {
    const url = await this.socialCardService.getUserCard(username);

    return { url };
  }
}
