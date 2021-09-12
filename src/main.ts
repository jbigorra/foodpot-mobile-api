import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ServerConfig } from "./shared/modules/config/server.config";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const serverConfig = app.get(ServerConfig);

  await app.listen(serverConfig.port);
}

bootstrap().catch(console.log);
