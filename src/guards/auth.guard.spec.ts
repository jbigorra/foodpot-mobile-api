import { AuthGuard } from "./auth.guard";
import { AuthService } from "../modules/auth/auth.service";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { createMock } from "ts-auto-mock";

describe.only("AuthGuard", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = createMock<AuthService>();
  });

  it("Should be defined", () => {
    expect(new AuthGuard(authService)).toBeDefined();
  });

  describe("Given user is not present in Request", () => {
    it("Should throw UnauthorizedException", async () => {
      const requestWithoutUser = {};
      const authGuard = new AuthGuard(authService);
      const executionContext = {
        switchToHttp: () => ({
          getRequest: jest.fn().mockReturnValue(requestWithoutUser)
        })
      } as unknown as ExecutionContext;

      await expect(
        authGuard.canActivate(executionContext)
      ).rejects.toThrowError(UnauthorizedException);
      expect(authService.getUser).toHaveBeenCalledTimes(0);
    });
  });

  describe("Given user is authenticated and present in Request", () => {
    it("Should return True", async () => {
      const requestWithUser = { user: { accessToken: "Some access token" } };
      const authGuard = new AuthGuard(authService);
      const executionContext = {
        switchToHttp: () => ({
          getRequest: jest.fn().mockReturnValue(requestWithUser)
        })
      } as unknown as ExecutionContext;

      await expect(
        authGuard.canActivate(executionContext)
      ).resolves.toBeTruthy();

      expect(authService.getUser).toHaveBeenCalledWith(
        requestWithUser.user.accessToken
      );
    });
  });
});
