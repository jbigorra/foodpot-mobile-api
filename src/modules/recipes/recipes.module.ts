import { Module } from "@nestjs/common";
import { RecipesQueries } from "./db/recipe.queries";
import { DbModule } from "../../shared/modules/database/db.module";
import { RecipesController } from "./recipes.controller";
import { Recipe, RecipeSchema } from "./db/schemas/recipes.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }])
  ],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
