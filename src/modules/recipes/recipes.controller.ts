import { Controller, Get, Inject } from "@nestjs/common";
import { RecipeResponseDTO } from "./recipes.controller.dtos";
import {
  I_BASE_REPOSITORY_TOKEN,
  IBaseRepository,
  RecipesInMemoryRepository
} from "./recipes.in-memory.repository";

@Controller("recipes")
export class RecipesController {
  constructor(private recipesRepository: RecipesInMemoryRepository) {}

  @Get()
  async getAll(): Promise<RecipeResponseDTO[]> {
    const recipes = await this.recipesRepository.getAll();
    console.log(recipes);
    return RecipeResponseDTO.from(recipes);
  }
}
