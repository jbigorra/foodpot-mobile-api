import { Module } from "@nestjs/common";
import { DbModule } from "src/shared/modules/database/db.module";
import { RecipesQueries } from "./db/recipe.queries";
import { RecipesController } from "./recipes.controller";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
