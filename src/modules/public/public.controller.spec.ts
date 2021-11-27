import { Test, TestingModule } from "@nestjs/testing";
import { PublicController } from ".";
import { createMock } from "@golevelup/ts-jest";
import { ServerConfig } from "../../shared/modules/config/server.config";

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
