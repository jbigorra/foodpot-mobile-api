import { Module } from "@nestjs/common";
import { RecipesController } from "./recipes.controller";
import {
  I_BASE_REPOSITORY_TOKEN,
  RecipesInMemoryRepository
} from "./recipes.in-memory.repository";

@Module({
  controllers: [RecipesController],
  providers: [
    {
      provide: I_BASE_REPOSITORY_TOKEN,
      useValue: RecipesInMemoryRepository
    }
  ],
  exports: []
})
export class RecipesModule {}
