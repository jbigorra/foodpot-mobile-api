import { Recipe } from ".prisma/client";
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { DbCursorPipe } from "src/pipes/db-cursor.pipe";
import { RecipesQueries } from "./db/user.queries";
import { RecipeResponseDTO } from "./recipes.controller.dtos";

@Controller("recipes")
export class RecipesController {
  constructor(private queryRecipes: RecipesQueries) {}

  @Get()
  async getAll(
    @Query("lastRecipeId", DbCursorPipe) lastRecipeId: number,
    @Query("take", new DefaultValuePipe(50), ParseIntPipe) take: number,
    @Query("searchText") searchText: string
  ): Promise<RecipeResponseDTO[]> {
    const recipes = await this.queryRecipes.getManyByText({
      cursor: lastRecipeId,
      take,
      searchText
    });
    return RecipeResponseDTO.fromDbModel(recipes);
  }
}
