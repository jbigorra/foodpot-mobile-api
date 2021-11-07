import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { createMock } from "ts-auto-mock";
import { AuthService } from "../auth/auth.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>()
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
