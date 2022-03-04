import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type RecipeDocument = Recipe & Document;

@Schema({ _id: false })
export class Ingredient {
  @Prop({ required: true })
  name: string;

  @Prop({ default: "" })
  quantity: string;

  @Prop({ default: "" })
  unit: string;

  @Prop({ required: true })
  description: string;
}

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now(), required: true })
  createdAt: Date;

  @Prop({ default: Date.now(), required: true })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt?: Date;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  pageUrl: string;

  @Prop({ required: true })
  pictureUrl: string;

  @Prop({ default: 0 })
  servings: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: "" })
  cookTime: string;

  @Prop({ default: "" })
  prepTime: string;

  @Prop({ default: "" })
  marinateTime: string;

  @Prop({ default: "" })
  calories: string;

  @Prop({ required: true, text: true })
  searchTerms: string;

  @Prop([Ingredient])
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
