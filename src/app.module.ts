import { Module } from "@nestjs/common";
import { AppConfigModule } from "./shared/modules/config/server.config.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { DbModule } from "./shared/modules/database/db.module";

@Module({
  imports: [AppConfigModule, RecipesModule, DbModule]
})
export class AppModule {}
