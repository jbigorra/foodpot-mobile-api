/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from ".prisma/client";
import { Recipe } from "@prisma/client";
import * as recipesJson from "./recipes.json";

// console.log(process.env.MIGRATION_DATABASE_URL);

const prisma = new PrismaClient({
  log: ["info", "query", "error", "warn"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadRecipes(jsonInput: Array<Record<string, any>>): Promise<Recipe[]> {
  const insertPromises = jsonInput.map(async (recipeData) => {
    return await prisma.recipe
      .create({
        data: {
          pageUrl: recipeData.page_url,
          pictureUrl: recipeData.picture_url,
          tags: recipeData.tags,
          servings: recipeData.servings,
          cookTime: recipeData.cook_time,
          marinateTime: recipeData.marinate_time,
          prepTime: recipeData.prep_time,
          calories: recipeData.calories,
          ingredients: recipeData.ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit,
            description: `${i.quantity} ${i.unit} ${i.name}`
          }))
        }
      })
      .then((recipe) => {
        console.info(`Inserted recipe ${recipe.id}`);
        return recipe;
      });
  });

  return Promise.all(insertPromises);
}

async function seed(): Promise<void> {
  // await prisma.$connect();
  //await loadRecipes(recipesJson as Array<Record<string, unknown>>);
  const jsonInput = recipesJson as Array<Record<string, any>>;
  await prisma.recipe
    .create({
      data: {
        pageUrl: jsonInput[0].page_url,
        pictureUrl: jsonInput[0].picture_url,
        tags: jsonInput[0].tags,
        servings: jsonInput[0].servings,
        cookTime: jsonInput[0].cook_time,
        marinateTime: jsonInput[0].marinate_time,
        prepTime: jsonInput[0].prep_time,
        calories: jsonInput[0].calories,
        ingredients: {
          createMany: jsonInput[0].ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit,
            description: `${i.quantity} ${i.unit} ${i.name}`
          }))
        }
      }
    })
    .then((recipe) => {
      console.info(`Inserted recipe ${recipe.id}`);
      return recipe;
    });
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => await prisma.$disconnect());
