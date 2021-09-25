import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppConfigModule } from "./shared/modules/config/server.config.module";
import { RecipesModule } from "./modules/recipes/recipes.module";

@Module({
  imports: [AppConfigModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
