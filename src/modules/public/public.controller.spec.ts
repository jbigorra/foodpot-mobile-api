import { Test, TestingModule } from "@nestjs/testing";
import { PublicController } from ".";
import { ServerConfig } from "../../shared/modules/config";
import { createMock } from "ts-auto-mock";

describe("PublicController", () => {
  let controller: PublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicController],
      providers: [
        {
          provide: ServerConfig,
          useValue: createMock<ServerConfig>()
        }
      ]
    }).compile();

    controller = module.get<PublicController>(PublicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
