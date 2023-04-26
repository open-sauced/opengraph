import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "fs/promises";
import { HighlightCardService } from "../../src/social-card/highlight-card.service";


const folderPath = "dist";

async function testHighlightCards () {
  const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  const instance = app.get(HighlightCardService);

  console.log(await instance.getHighlightData(102))
}

testHighlightCards();
