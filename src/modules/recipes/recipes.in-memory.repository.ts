import { Injectable } from "@nestjs/common";
import { IRecipe } from "./entities/recipe.entity";
import * as jsonRecipes from "./recipes.json";

export const I_BASE_REPOSITORY_TOKEN = "IBaseRepository";

export interface IBaseRepository {
  getAll(query: { limit: number }): Promise<IRecipe[]>;
}

@Injectable()
export class RecipesInMemoryRepository implements IBaseRepository {
  getAll(query: { limit: number }): Promise<IRecipe[]> {
    const recipes = jsonRecipes as unknown as IRecipe[];
    return Promise.resolve(recipes.slice(0, query.limit));
  }
}
