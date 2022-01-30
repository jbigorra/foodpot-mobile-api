import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { AppModule } from "./app.module";
import { ServerConfig } from "./shared/modules/config/server.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("v1", {
    exclude: ["public/recover-account", "public/redirect-auth"]
  });

  // STATIC FILES CONFIGURATION
  app.useStaticAssets(join(__dirname, "../src", "public"));
  app.setBaseViewsDir(join(__dirname, "../src", "views"));
  app.setViewEngine("hbs");

  // SWAGGER CONFIGURATION
  const config = new DocumentBuilder()
    .setTitle("Foodpot API Docs")
    .setDescription("Food API swagger reference")
    .setVersion("1.0")
    .addTag("foodpot")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("v1", app, document);

  // INITIALIZE SERVER
  const serverConfig = app.get(ServerConfig);

  await app.listen(serverConfig.port);

  console.log(`Listening at: http://localhost:${serverConfig.port}`);
}

bootstrap().catch(console.log);
