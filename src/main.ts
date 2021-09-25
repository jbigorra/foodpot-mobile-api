import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ServerConfig } from "./shared/modules/config/server.config";
import { Logger } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("v1");

  const serverConfig = app.get(ServerConfig);
  // const logger = app.get(Logger);

  await app.listen(serverConfig.port);

  console.log(`Listening at: http://localhost:${serverConfig.port}`);
}

bootstrap().catch(console.log);
