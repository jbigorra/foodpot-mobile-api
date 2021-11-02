import { Ingredient } from "@prisma/client";
import { RecipeWithIngredients } from "../db/recipe.queries";

export class RecipeResponse {
  constructor(
    readonly calories: string,
    readonly cookTime: string,
    readonly id: number,
    readonly title: string,
    readonly ingredients: IngredientDTO[],
    readonly marinateTime: string,
    readonly pageUrl: string,
    readonly pictureUrl: string,
    readonly prepTime: string,
    readonly servings: number
  ) {}

  static fromDbModel(recipes: RecipeWithIngredients[]): RecipeResponse[] {
    return recipes.map(
      (r) =>
        new RecipeResponse(
          r.calories,
          r.cookTime,
          r.id,
          r.title,
          IngredientDTO.fromDbModel(r.ingredients),
          r.marinateTime,
          r.pageUrl,
          r.pictureUrl,
          r.prepTime,
          r.servings
        )
    );
  }
}

export class IngredientDTO {
  constructor(readonly description: string) {}

  static fromDbModel(ingredients: Ingredient[]): IngredientDTO[] {
    return ingredients.map(
      (ingredient) => new IngredientDTO(ingredient.description)
    );
  }
}
