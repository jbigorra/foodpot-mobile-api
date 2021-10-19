-- DropIndex
DROP INDEX "Recipe_tags_title_searchTerms_idx";

-- CreateIndex
CREATE INDEX "Recipe_searchTerms_idx" ON "Recipe"("searchTerms");

-- CreateIndex
CREATE INDEX "Recipe_cookTime_idx" ON "Recipe"("cookTime");

-- CreateIndex
CREATE INDEX "Recipe_prepTime_idx" ON "Recipe"("prepTime");
