import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("Users social cards")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:username")
  @ApiOperation({
    operationId: "generateUserSocialCard",
    summary: "Gets latest cache aware social card link for :username or generates a new one",
  })
  @ApiOkResponse({ type: String })
  @ApiNotFoundResponse({ description: "User not found" })
  async generateUserSocialCard (
    @Param("username") username: string,
  ): Promise<String> {
    return this.appService.getUserCard(username);
  }
}
