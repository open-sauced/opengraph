import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";
import { LoggerModule } from "nestjs-pino";
import { clc } from "@nestjs/common/utils/cli-colors.util";

import { SocialCardModule } from './social-card/social-card.module';
import ApiConfig from "./config/api.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        ApiConfig,
      ],
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          name: `os.${String(config.get("api.codename")).toLowerCase()}`,
          level: config.get("api.logging"),
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              levelFirst: true,
              translateTime: "UTC:hh:MM:ss.l",
              singleLine: true,
              messageFormat: `${clc.yellow(`[{context}]`)} ${clc.green(`{msg}`)}`,
              ignore: "pid,hostname,context",
            },
          },
          customProps: () => ({ context: "HTTP" }),
        },
        exclude: [{ method: RequestMethod.ALL, path: "check" }],
      }),
    }),
    TerminusModule,
    HttpModule,
    SocialCardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
