import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { UserCardService } from "../../src/social-card/user-card/user-card.service";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "fs/promises";

const testUsernames = ["bdougie", "deadreyo", "defunkt", "0-vortex", "Anush008", "diivi"];
const folderPath = "dist/local-dev";

async function testUserCards() {
  const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  const instance = app.get(UserCardService);

  const promises = testUsernames.map(async (username) => {
    const { png } = await instance.generateCardBuffer(username);

    if (!existsSync(folderPath)) {
      await mkdir(folderPath);
    }
    await writeFile(`${folderPath}/${username}.png`, png);
  });

  // generating sequential: 10.5 seconds, parallel: 4.5 seconds
  await Promise.all(promises);
}

testUserCards();
