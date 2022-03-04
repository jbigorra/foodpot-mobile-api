import { Recipe, Ingredient } from "../db/schemas/recipes.schema";

export class RecipeResponse {
  readonly calories: string;
  readonly cookTime: string;
  readonly id?: number;
  readonly uuid: string;
  readonly title: string;
  readonly ingredients: IngredientDTO[];
  readonly marinateTime: string;
  readonly pageUrl: string;
  readonly pictureUrl: string;
  readonly prepTime: string;
  readonly servings: number;

  constructor(
    calories: string,
    cookTime: string,
    uuid: string,
    title: string,
    ingredients: IngredientDTO[],
    marinateTime: string,
    pageUrl: string,
    pictureUrl: string,
    prepTime: string,
    servings: number
  ) {
    this.calories = calories;
    this.cookTime = cookTime;
    this.uuid = uuid;
    this.title = title;
    this.ingredients = ingredients;
    this.marinateTime = marinateTime;
    this.pageUrl = pageUrl;
    this.pictureUrl = pictureUrl;
    this.prepTime = prepTime;
    this.servings = servings;
  }

  static fromArrayOf(recipes: Recipe[]): RecipeResponse[] {
    return recipes.map(
      (r) =>
        new RecipeResponse(
          r.calories,
          r.cookTime,
          r._id.toString(),
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

  static fromOne(recipe: Recipe): RecipeResponse {
    return new RecipeResponse(
      recipe.calories,
      recipe.cookTime,
      recipe._id.toString(),
      recipe.title,
      IngredientDTO.fromDbModel(recipe.ingredients),
      recipe.marinateTime,
      recipe.pageUrl,
      recipe.pictureUrl,
      recipe.prepTime,
      recipe.servings
    );
  }
}

export class IngredientDTO {
  readonly description: string;

  constructor(description: string) {
    this.description = description;
  }

  static fromDbModel(ingredients: Ingredient[]): IngredientDTO[] {
    return ingredients.map(
      (ingredient) => new IngredientDTO(ingredient.description)
    );
  }
}
