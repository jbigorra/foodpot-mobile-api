-- DropIndex
DROP INDEX "Recipe_tags_idx";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "title" VARCHAR(256) NOT NULL DEFAULT E'';

-- CreateIndex
CREATE INDEX "Recipe_tags_title_idx" ON "Recipe"("tags", "title");
