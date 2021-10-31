import { AuthenticatedUser } from "../auth.service";

export class AuthenticatedUserResponse {
  constructor(
    private readonly accessToken: string,
    private readonly refreshToken: string
  ) {}

  static from(data: AuthenticatedUser): AuthenticatedUserResponse {
    return new AuthenticatedUserResponse(data.accessToken, data.refreshToken);
  }
}
