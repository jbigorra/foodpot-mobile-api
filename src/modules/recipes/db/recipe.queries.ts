import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DbClient } from "src/shared/modules/database/db.client";

const recipeWithIngredients = Prisma.validator<Prisma.RecipeArgs>()({
  include: { ingredients: true }
});

export type RecipeWithIngredients = Prisma.RecipeGetPayload<
  typeof recipeWithIngredients
>;

@Injectable()
export class RecipesQueries {
  constructor(private db: DbClient) {}

  async getManyByText(params: {
    cursor?: number;
    take?: number;
    searchText?: string;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
  }): Promise<RecipeWithIngredients[]> {
    const { cursor, take, searchText, orderBy } = params;
    return this.db.recipe.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take,
      orderBy,
      where: {
        searchTerms: {
          contains: searchText
        }
      },
      include: {
        ingredients: true
      }
    });
  }
}
