import { Module } from "@nestjs/common";
import { RecipesController } from ".";
import { RecipesQueries } from "./db/recipe.queries";
import { DbModule } from "../../shared/modules/database/db.module";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
