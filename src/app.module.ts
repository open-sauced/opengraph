import { Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";
import { LoggerModule } from "nestjs-pino";
import { clc } from "@nestjs/common/utils/cli-colors.util";

import ApiConfig from "./config/api.config";
import GitHubConfig from "./config/github.config";
import DigitalOceanConfig from "./config/digital-ocean.config";
import { UserCardModule } from "./social-card/user-card/user-card.module";
import { S3FileStorageModule } from "./s3-file-storage/s3-file-storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        ApiConfig,
        GitHubConfig,
        DigitalOceanConfig,
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
    UserCardModule,
    S3FileStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
