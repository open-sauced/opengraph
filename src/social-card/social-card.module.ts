import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { SocialCardService } from './social-card.service';
import { SocialCardController } from './social-card.controller';

@Module({
  imports: [HttpModule],
  providers: [SocialCardService],
  controllers: [SocialCardController]
})
export class SocialCardModule {}
