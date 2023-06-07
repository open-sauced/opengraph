import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "fs/promises";
import { InsightCardService } from "../../src/social-card/insight-card/insight-card.service";

const testInsightIds = [350, 351];

const folderPath = "dist";

async function testHighlightCards() {
  const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  const instance = app.get(InsightCardService);

  const promises = testInsightIds.map(async (id) => {
    const { png } = await instance.generateCardBuffer(id);

    if (!existsSync(folderPath)) {
      await mkdir(folderPath);
    }
    await writeFile(`${folderPath}/${id}.png`, png);
  });

  // generating sequential: 10.5 seconds, parallel: 4.5 seconds
  await Promise.all(promises);
}

testHighlightCards();
