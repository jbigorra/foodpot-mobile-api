import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query
} from "@nestjs/common";
import { RecipesQueries } from "./db/recipe.queries";
import { RecipeResponse } from "./responses/recipes-response.dto";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class RecipeFilters {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @ApiPropertyOptional({ type: Number, default: 1 })
  page = 1;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @ApiPropertyOptional({ type: Number, default: 10, maximum: 100 })
  take = 50;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, default: "" })
  searchText?: string = "";

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => value.split(","))
  @ApiPropertyOptional({
    type: String,
    default: "",
    example: "lunch,dinner,quick",
    description: "Comma separated string values"
  })
  categories?: string[] = [];
}

@Controller("recipes")
export class RecipesController {
  constructor(private recipeQueries: RecipesQueries) {}

  @Get()
  async getAll(@Query() filters: RecipeFilters): Promise<RecipeResponse[]> {
    const { page, take, searchText, categories } = filters;
    const recipes = await this.recipeQueries.getManyByText({
      page,
      take,
      searchText,
      categories
    });
    return RecipeResponse.fromArrayOf(recipes);
  }

  @Get(":uuid")
  async getOne(@Param("uuid") uuid: string): Promise<RecipeResponse> {
    const recipe = await this.recipeQueries.getOneByUuid(uuid);

    if (!recipe) throw new NotFoundException();

    return RecipeResponse.fromOne(recipe);
  }
}
