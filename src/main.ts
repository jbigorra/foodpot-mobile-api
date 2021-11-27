import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ServerConfig } from "./shared/modules/config/server.config";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("v1", {
    exclude: ["public/recover-account", "public/redirect-auth"]
  });
  app.useStaticAssets(join(__dirname, "../src", "public"));
  app.setBaseViewsDir(join(__dirname, "../src", "views"));
  app.setViewEngine("hbs");

  const serverConfig = app.get(ServerConfig);

  await app.listen(serverConfig.port);

  console.log(`Listening at: http://localhost:${serverConfig.port}`);
}

bootstrap().catch(console.log);
