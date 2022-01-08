import { Body, Controller, Get, Header, Post } from "@nestjs/common";
// import { ApiBasicAuth, ApiBody } from "@nestjs/swagger";
import {
  AuthenticatedUserResponse,
  RecoverAccountRequest,
  RefreshUserSessionRequest,
  SigninWithEmailRequest,
  SignupWithEmailRequest
} from ".";
import { AuthService } from "./auth.service";

// @ApiBasicAuth()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  // @ApiBody({ type: SignupWithEmailRequest })
  async signupWithEmail(
    @Body() { email, password }: SignupWithEmailRequest
  ): Promise<void> {
    await this.authService.signUpWithEmail(email, password);
  }

  @Post("/signin")
  // @ApiBody({ type: SigninWithEmailRequest })
  async signin(
    @Body() { email, password }: SigninWithEmailRequest
  ): Promise<AuthenticatedUserResponse> {
    const data = await this.authService.signInWithEmail(email, password);

    return AuthenticatedUserResponse.from(data);
  }

  @Post("/refresh")
  // @ApiBody({ type: RefreshUserSessionRequest })
  async refresh(
    @Body() { refreshToken }: RefreshUserSessionRequest
  ): Promise<AuthenticatedUserResponse> {
    const data = await this.authService.refreshSession(refreshToken);

    return AuthenticatedUserResponse.from(data);
  }

  @Post("/recover")
  // @ApiBody({ type: RecoverAccountRequest })
  async recover(@Body() { email }: RecoverAccountRequest): Promise<void> {
    await this.authService.recoverAccountFor(email);
  }

  @Get("/verified")
  @Header("content-type", "text/html")
  async verified(): Promise<string> {
    return "Email confirmed!";
  }
}
