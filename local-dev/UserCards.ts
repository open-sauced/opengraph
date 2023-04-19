import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SocialCardModule } from 'src/social-card/social-card.module';
import { SocialCardController } from 'src/social-card/social-card.controller';
import { SocialCardService } from '../src/social-card/social-card.service';
import { HttpService } from '@nestjs/axios';
import { GithubService } from 'src/github/github.service';
import { S3FileStorageService } from 'src/s3-file-storage/s3-file-storage.service';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'fs/promises'


const testUsernames = [
  'bdougie', 'deadreyo', 'defunkt', '0-vortex'
]

const folderPath = 'local-dev/output';

async function testUserCards()  {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const instance = app.get(SocialCardService);

  const promises = testUsernames.map(async (username) => {
    const { svg } = await instance.generateCardBuffer(username);

    if(!existsSync(folderPath)) {
      await mkdir(folderPath);
    }
    await writeFile(`${folderPath}/${username}.svg`, svg);
  })

  // generating sequential: 10.5 seconds, parallel: 4.5 seconds
  await Promise.all(promises);

}

testUserCards();
