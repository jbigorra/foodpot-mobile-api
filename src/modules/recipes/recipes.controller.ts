import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { RecipeResponse, RecipesQueries } from ".";
import { DbCursorPipe } from "../../pipes";

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
    return RecipeResponse.fromArrayOf(recipes);
  }

  @Get(":uuid")
  async getOne(@Param("uuid") uuid: string): Promise<RecipeResponse> {
    const recipe = await this.queryRecipes.getOneByUuid(uuid);

    if (!recipe) throw new NotFoundException();

    return RecipeResponse.fromOne(recipe);
  }
}
