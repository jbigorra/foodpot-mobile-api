import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import {
  UpdateEmailRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
  UserResponse
} from ".";
import { AuthService } from "../auth";
import { AuthGuard } from "../../guards";

@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async get(@Req() { user }: Request): Promise<UserResponse> {
    const userInfo = await this.authService.getUser(user.accessToken);

    return UserResponse.from(userInfo);
  }

  @Patch()
  async update(
    @Body() userData: UpdateUserRequest,
    @Req() { user }: Request
  ): Promise<UserResponse> {
    const userInfo = await this.authService.updateUser(
      user.accessToken,
      userData
    );

    return UserResponse.from(userInfo);
  }

  @Post("/password")
  async updatePassword(
    @Body() { password }: UpdatePasswordRequest,
    @Req() { user }: Request
  ): Promise<UserResponse> {
    const userInfo = await this.authService.updatePassword(
      user.accessToken,
      password
    );

    return UserResponse.from(userInfo);
  }

  // TODO: Requires auth flow with email confirmation
  @Post("/email")
  async updateEmail(
    @Body() { email }: UpdateEmailRequest,
    @Req() { user }: Request
  ): Promise<UserResponse> {
    const userInfo = await this.authService.updateEmail(
      user.accessToken,
      email
    );

    return UserResponse.from(userInfo);
  }
}
