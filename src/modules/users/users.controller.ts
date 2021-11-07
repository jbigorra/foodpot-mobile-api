import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { UpdateUserRequest } from "./requests/users-requests.schemas";
import { Request } from "express";
import { AuthGuard } from "../../guards/auth.guard";
import { UserResponse } from "./responses/user-response.schemas";

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
}
