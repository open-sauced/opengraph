import { Controller, Get, Header, HttpStatus, Param, ParseIntPipe, Redirect, Res, StreamableFile } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { HighlightCardService } from "./highlight-card.service";


@Controller("highlights")
@ApiTags("Highlight social cards")
export class HighlightCardController {
  constructor (
    private readonly highlightCardService: HighlightCardService,
  ) {}

  @Get("/:id")
  @ApiOperation({
    operationId: "generateHighlightSocialCard",
    summary: "Generates the social card image for the provided highlight ID",
  })
  @Header("Content-Type", "image/png")
  @ApiOkResponse({ type: StreamableFile, description: "Social card image" })
  @ApiNotFoundResponse({ description: "Highlight not found" })
  @ApiForbiddenResponse({ description: "Rate limit exceeded" })
  @ApiBadRequestResponse({ description: "Invalid highlight id" })
  @Redirect()
  async generateHighlightSocialCard (
    @Param("id", ParseIntPipe) id: number,
      @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const png = await this.highlightCardService.getHighlightCard(id);

    return res.status(HttpStatus.OK).send(png);
  }

  @Get("/:id/metadata")
  @ApiOperation({
    operationId: "getHighlightSocialCardMetadata",
    summary: "Gets latest cache aware social card metadata for :id",
  })
  @ApiNoContentResponse({ description: "Highlight social card image is up to date", status: HttpStatus.NO_CONTENT })
  @ApiResponse({ description: "Highlight social card image needs regeneration", status: HttpStatus.NOT_MODIFIED })
  @ApiNotFoundResponse({ description: "Highlight social card image not found", status: HttpStatus.NOT_FOUND })
  @ApiBadRequestResponse({ description: "Invalid highlight id", status: HttpStatus.BAD_REQUEST })
  async checkHighlightSocialCard (
    @Param("id", ParseIntPipe) id: number,
      @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const { fileUrl, hasFile, needsUpdate, lastModified } = await this.highlightCardService.checkRequiresUpdate(id);

    return res
      .headers({
        "x-amz-meta-last-modified": lastModified?.toISOString() ?? "",
        "x-amz-meta-location": fileUrl,
      })
      .status(hasFile ? needsUpdate ? HttpStatus.NOT_MODIFIED : HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND)
      .send();
  }
}
