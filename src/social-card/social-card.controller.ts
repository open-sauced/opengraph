import { Controller, Get, Head, Header, HttpStatus, Param, Redirect, Res, StreamableFile } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FastifyReply } from "fastify";

import { SocialCardService } from "./social-card.service";

@Controller("users")
@ApiTags("User social cards")
export class SocialCardController {
  constructor (
    private readonly socialCardService: SocialCardService,
  ) {}

  @Head("/:username")
  @ApiNoContentResponse({ description: "User social card image is up to date", status: HttpStatus.NO_CONTENT })
  @ApiResponse({ description: "User social card image needs regeneration", status: HttpStatus.NOT_MODIFIED })
  @ApiNotFoundResponse({ description: "User social card image not found", status: HttpStatus.NOT_FOUND })
  async checkUserSocialCard (
    @Param("username") username: string,
      @Res() res: FastifyReply,
  ): Promise<void> {
    const { fileUrl, hasFile, needsUpdate, lastModified } = await this.socialCardService.checkRequiresUpdate(username);

    return res
      .headers({
        "x-amz-meta-last-modified": lastModified?.toISOString() ?? "",
        "x-amz-meta-location": fileUrl,
      })
      .status(hasFile ? needsUpdate ? HttpStatus.NOT_MODIFIED : HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND)
      .send();
  }

  @Get("/:username")
  @ApiOperation({
    operationId: "generateUserSocialCard",
    summary: "Gets latest cache aware social card link for :username or generates a new one",
  })
  @Header("Content-Type", "image/png")
  @ApiOkResponse({ type: StreamableFile, description: "Social card image" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiForbiddenResponse({ description: "Rate limit exceeded" })
  @Redirect()
  async generateUserSocialCard (
    @Param("username") username: string,
      @Res() res: FastifyReply,
  ): Promise<void> {
    const { fileUrl, hasFile, needsUpdate } = await this.socialCardService.checkRequiresUpdate(username);

    if (hasFile && !needsUpdate) {
      return res.status(HttpStatus.FOUND).redirect(fileUrl);
    }

    const url = await this.socialCardService.getUserCard(username);

    return res.status(HttpStatus.FOUND).redirect(url);
  }
}
