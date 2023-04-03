import { Controller, Get, Header, Param, StreamableFile } from "@nestjs/common";
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
  async generateUserSocialCard (
    @Param("username") username: string,
  ): Promise<StreamableFile> {
    const image = await this.socialCardService.getUserCard(username);

    return new StreamableFile(image);
  }
}
