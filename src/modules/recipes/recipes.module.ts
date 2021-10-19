import { Module } from "@nestjs/common";
import { DbModule } from "src/shared/modules/database/db.module";
import { RecipesQueries } from "./db/user.queries";
import { RecipesController } from "./recipes.controller";
import {
  I_BASE_REPOSITORY_TOKEN,
  RecipesInMemoryRepository
} from "./recipes.in-memory.repository";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesInMemoryRepository, RecipesQueries],
  exports: []
})
export class RecipesModule {}
