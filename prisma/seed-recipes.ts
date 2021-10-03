/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Recipe } from "@prisma/client";
import * as recipesJson from "./recipes.json";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query"
    },
    {
      emit: "stdout",
      level: "error"
    },
    {
      emit: "stdout",
      level: "info"
    },
    {
      emit: "stdout",
      level: "warn"
    }
  ]
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Duration: " + e.duration + "ms");
});

async function main(): Promise<void> {
  await prisma.ingredient.deleteMany({});
  await prisma.recipe.deleteMany({});

  const input = recipesJson as unknown as Array<Record<string, any>>;

  for (const recipe of input) {
    if (!recipe.picture_url) {
      console.log(`Skipping ${recipe.page_url}`);
      continue;
    }
    await prisma.recipe
      .create({
        data: {
          pageUrl: recipe.page_url,
          pictureUrl: recipe.picture_url || "",
          tags: recipe.tags.filter((v) => v !== null),
          servings: recipe.servings,
          calories: recipe.calories.value
            ? `${recipe.calories.value} ${recipe.calories.unit}`
            : "",
          cookTime: recipe.cook_time.value
            ? `${recipe.cook_time.value} ${recipe.cook_time.unit}`
            : "",
          marinateTime: recipe.marinate_time.value
            ? `${recipe.marinate_time.value} ${recipe.marinate_time.unit}`
            : "",
          prepTime: recipe.prep_time.value
            ? `${recipe.prep_time.value} ${recipe.prep_time.unit}`
            : "",
          ingredients: {
            create: recipe.ingredients.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              unit: i.unit,
              description: `${[i.quantity || "", i.unit || "", i.name || ""]
                .join(" ")
                .trim()}`
            }))
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
