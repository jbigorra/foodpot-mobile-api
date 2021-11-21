import { Module } from "@nestjs/common";
import { DbModule } from "src/shared/modules/database/db.module";
import { RecipesController, RecipesQueries } from ".";

@Module({
  imports: [DbModule],
  controllers: [RecipesController],
  providers: [RecipesQueries],
  exports: []
})
export class RecipesModule {}
