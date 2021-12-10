import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { RecipeResponse } from ".";
import { DbCursorPipe } from "../../pipes";
import { RecipesQueries } from "./db/recipe.queries";

@Controller("recipes")
export class RecipesController {
  constructor(private queryRecipes: RecipesQueries) {}

  @Get()
  @ApiQuery({ name: "lastRecipeId", type: Number })
  @ApiQuery({ name: "take", type: Number })
  @ApiQuery({ name: "searchText", type: String })
  @ApiResponse({
    type: [RecipeResponse],
    description: "Returns a list of recipes"
  })
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
  @ApiParam({ name: "uuid", type: String })
  @ApiResponse({
    type: RecipeResponse,
    description: "Returns one specific recipe by uuid"
  })
  async getOne(@Param("uuid") uuid: string): Promise<RecipeResponse> {
    const recipe = await this.queryRecipes.getOneByUuid(uuid);

    if (!recipe) throw new NotFoundException();

    return RecipeResponse.fromOne(recipe);
  }
}
