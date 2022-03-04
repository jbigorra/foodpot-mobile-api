import { Injectable } from "@nestjs/common";
import { Recipe, RecipeDocument } from "./schemas/recipes.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RecipesQueries {
  constructor(
    @InjectModel(Recipe.name) private recipe: Model<RecipeDocument>
  ) {}

  async getManyByText(params: {
    cursor?: number;
    take?: number;
    searchText?: string;
    orderBy?: string;
  }): Promise<Recipe[]> {
    const { cursor, take, searchText, orderBy } = params;
    return await this.recipe
      .find({ $text: { $search: searchText } })
      .limit(take)
      .exec();
  }

  async getOneByUuid(uuid: string): Promise<Recipe | null> {
    return await this.recipe.findById(uuid).exec();
  }
}
