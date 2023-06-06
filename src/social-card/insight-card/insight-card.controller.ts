import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseIntPipe,
  Redirect,
  Res,
  StreamableFile,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FastifyReply } from "fastify";
import { InsightCardService } from "./insight-card.service";

@Controller("insights")
@ApiTags("Insight social cards")
export class InsightCardController {
  constructor (private readonly insightCardService: InsightCardService) {}

  @Get("/:id")
  @ApiOperation({
    operationId: "generateInsightSocialCard",
    summary: "Gets latest cache aware social card link for :id or generates a new one",
  })
  @Header("Content-Type", "image/png")
  @ApiOkResponse({ type: StreamableFile, description: "Social card image" })
  @ApiNotFoundResponse({ description: "Insight not found" })
  @ApiForbiddenResponse({ description: "Rate limit exceeded" })
  @ApiBadRequestResponse({ description: "Invalid insight id" })
  @Redirect()
  async generateInsightSocialCard (
    @Param("id", ParseIntPipe) id: number,
      @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const { fileUrl, hasFile, needsUpdate } = await this.insightCardService.checkRequiresUpdate(id);

    if (hasFile && !needsUpdate) {
      return res.status(HttpStatus.FOUND).redirect(fileUrl);
    }

    const url = await this.insightCardService.getgetInsightCard(id);

    return res.status(HttpStatus.FOUND).redirect(url);
  }

  @Get("/:id/metadata")
  @ApiOperation({
    operationId: "getInsightSocialCardMetadata",
    summary: "Gets latest cache aware social card metadata for :id",
  })
  @ApiNoContentResponse({ description: "Insight social card image is up to date", status: HttpStatus.NO_CONTENT })
  @ApiResponse({ description: "Insight social card image needs regeneration", status: HttpStatus.NOT_MODIFIED })
  @ApiNotFoundResponse({ description: "Insight social card image not found", status: HttpStatus.NOT_FOUND })
  @ApiBadRequestResponse({ description: "Invalid insight id", status: HttpStatus.BAD_REQUEST })
  async checkInsightSocialCard (
    @Param("id", ParseIntPipe) id: number,
      @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<void> {
    const { fileUrl, hasFile, needsUpdate, lastModified } = await this.insightCardService.checkRequiresUpdate(id);

    return res
      .headers({
        "x-amz-meta-last-modified": lastModified?.toISOString() ?? "",
        "x-amz-meta-location": fileUrl,
      })
      .status(hasFile ? (needsUpdate ? HttpStatus.NOT_MODIFIED : HttpStatus.NO_CONTENT) : HttpStatus.NOT_FOUND)
      .send();
  }
}
