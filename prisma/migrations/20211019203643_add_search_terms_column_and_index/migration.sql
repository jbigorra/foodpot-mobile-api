-- DropIndex
DROP INDEX "Recipe_tags_title_idx";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "searchTerms" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE INDEX "Recipe_tags_title_searchTerms_idx" ON "Recipe"("tags", "title", "searchTerms");
