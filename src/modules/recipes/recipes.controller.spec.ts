import { RecipesController } from "./recipes.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { RecipesQueries } from "./db/recipe.queries";
import { createMock } from "@golevelup/ts-jest";

describe("RecipesController", () => {
  let controller: RecipesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesQueries,
          useValue: createMock<RecipesQueries>()
        }
      ]
    }).compile();
    controller = module.get<RecipesController>(RecipesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
