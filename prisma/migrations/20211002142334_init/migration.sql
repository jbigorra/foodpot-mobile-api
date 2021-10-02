-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ(3),
    "pageUrl" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "servings" INTEGER,
    "tags" TEXT[],
    "cookTime" VARCHAR(35) NOT NULL DEFAULT E'',
    "prepTime" VARCHAR(35) NOT NULL DEFAULT E'',
    "marinateTime" VARCHAR(35) NOT NULL DEFAULT E'',
    "calories" VARCHAR(35) NOT NULL DEFAULT E'',

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ(3),
    "name" VARCHAR(250) NOT NULL DEFAULT E'',
    "quantity" VARCHAR(10) NOT NULL DEFAULT E'',
    "unit" VARCHAR(25) NOT NULL DEFAULT E'',
    "description" VARCHAR(285) NOT NULL DEFAULT E'',
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uuid_key" ON "Recipe"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_pageUrl_key" ON "Recipe"("pageUrl");

-- CreateIndex
CREATE INDEX "Recipe_tags_idx" ON "Recipe"("tags");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
