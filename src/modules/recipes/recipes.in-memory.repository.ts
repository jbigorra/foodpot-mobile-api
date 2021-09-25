import { Injectable } from "@nestjs/common";
import { IRecipe } from "./entities/recipe.entity";
import recipes from "./recipes.json";

export const I_BASE_REPOSITORY_TOKEN = "IBaseRepository";

export interface IBaseRepository {
  getAll(): Promise<IRecipe[]>;
}

@Injectable()
export class RecipesInMemoryRepository implements IBaseRepository {
  getAll(): Promise<IRecipe[]> {
    return Promise.resolve(recipes as unknown as IRecipe[]);
  }
}
