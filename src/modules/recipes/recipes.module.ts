import { Module } from "@nestjs/common";
import { RecipesController, RecipesQueries } from ".";
import { DbModule } from "../../shared/modules/database";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
