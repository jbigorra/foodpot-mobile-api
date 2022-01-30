import { Module } from "@nestjs/common";
import { RecipesQueries } from "./db/recipe.queries";
import { DbModule } from "../../shared/modules/database/db.module";
import { RecipesController } from "./recipes.controller";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
