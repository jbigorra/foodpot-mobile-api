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
    page?: number;
    take?: number;
    searchText?: string;
    categories?: string[];
    sort?: string;
  }): Promise<Recipe[]> {
    const { page, take, searchText, categories, sort } = params;
    const skip = (page - 1) * take;
    const textSearch = searchText
      ? {
          $text: {
            $search: `${searchText}`
          }
        }
      : {};
    const tags = categories.length ? { tags: { $all: categories } } : {};
    return await this.recipe
      .aggregate([
        {
          $match: {
            $and: [tags, textSearch]
          }
        },
        {
          $skip: skip
        },
        { $limit: take },
        { $sort: { createdAt: -1 } }
      ])
      .exec();
  }

  async getOneByUuid(uuid: string): Promise<Recipe | null> {
    return await this.recipe.findById(uuid).exec();
  }
}
