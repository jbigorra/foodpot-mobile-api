import { Controller, Get, Inject } from "@nestjs/common";
import { RecipeResponseDTO } from "./recipes.controller.dtos";
import {
  I_BASE_REPOSITORY_TOKEN,
  IBaseRepository
} from "./recipes.in-memory.repository";

@Controller("recipes")
export class RecipesController {
  constructor(
    @Inject(I_BASE_REPOSITORY_TOKEN) private recipesRepository: IBaseRepository
  ) {}

  @Get()
  async getAll(): Promise<RecipeResponseDTO[]> {
    console.log(this.recipesRepository);
    const recipes = await this.recipesRepository.getAll();
    return RecipeResponseDTO.from(recipes);
  }
}
