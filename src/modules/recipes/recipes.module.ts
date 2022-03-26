import { Module } from "@nestjs/common";
import { RecipesQueries } from "./db/recipe.queries";
import { RecipesController } from "./recipes.controller";
import { Recipe, RecipeSchema } from "./db/schemas/recipes.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }])
  ],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
