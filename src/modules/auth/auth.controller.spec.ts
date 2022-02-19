import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";
import { VendorModule } from "../../shared/modules/vendor/vendor.module";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServerConfigModule, VendorModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>()
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
