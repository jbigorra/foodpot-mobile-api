export class RecipeResponseDTO {
  calories: IUnit;
  cookTime: IUnit;
  id: number;
  ingredients: IIngredient[];
  marinateTime: IUnit;
  pageUrl: string;
  pictureUrl: string;
  prepTime: IUnit;
  servings: number;
  tags: string[];

  static from(recipes: IRecipe[]): RecipeResponseDTO[] {
    return recipes as RecipeResponseDTO[];
  }
}

export interface IRecipe {
  pageUrl: string;
  tags: string[];
  pictureUrl: string;
  id: number;
  cookTime: IUnit;
  prepTime: IUnit;
  marinateTime: IUnit;
  calories: IUnit;
  servings: number;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface IUnit {
  value: number;
  unit: string;
}
