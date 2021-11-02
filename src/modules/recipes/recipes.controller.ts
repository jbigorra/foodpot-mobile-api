import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { DbCursorPipe } from "src/pipes/db-cursor.pipe";
import { RecipesQueries } from "./db/recipe.queries";
import { RecipeResponse } from "./responses/recipes-response.schemas";

@Controller("recipes")
export class RecipesController {
  constructor(private queryRecipes: RecipesQueries) {}

  @Get()
  async getAll(
    @Query("lastRecipeId", DbCursorPipe) lastRecipeId: number,
    @Query("take", new DefaultValuePipe(50), ParseIntPipe) take: number,
    @Query("searchText") searchText: string
  ): Promise<RecipeResponse[]> {
    const recipes = await this.queryRecipes.getManyByText({
      cursor: lastRecipeId,
      take,
      searchText
    });
    return RecipeResponse.fromDbModel(recipes);
  }
}
