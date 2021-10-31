import { Body, Controller, Get, Header, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  RefreshUserSessionRequest,
  SigninWithEmailRequest,
  SignupWithEmailRequest
} from "./requests/auth-requests.schemas";
import { AuthenticatedUserResponse } from "./responses/auth-responses.schemas";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signupWithEmail(
    @Body() { email, password }: SignupWithEmailRequest
  ): Promise<void> {
    await this.authService.signUpWithEmail(email, password);
  }

  @Post("/signin")
  async signin(
    @Body() { email, password }: SigninWithEmailRequest
  ): Promise<AuthenticatedUserResponse> {
    const data = await this.authService.signInWithEmail(email, password);

    return AuthenticatedUserResponse.from(data);
  }

  @Post("/refresh")
  async refresh(
    @Body() { refreshToken }: RefreshUserSessionRequest
  ): Promise<AuthenticatedUserResponse> {
    const data = await this.authService.refreshSession(refreshToken);

    return AuthenticatedUserResponse.from(data);
  }

  @Get("/verified")
  @Header("content-type", "text/html")
  async verified(): Promise<string> {
    return "Email confirmed!";
  }
}
