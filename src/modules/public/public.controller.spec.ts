import { Test, TestingModule } from "@nestjs/testing";
import { PublicController } from ".";

describe("PublicController", () => {
  let controller: PublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicController]
    }).compile();

    controller = module.get<PublicController>(PublicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
