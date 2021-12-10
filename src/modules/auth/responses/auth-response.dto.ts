import { AuthenticatedUser } from "../auth.service";

export class AuthenticatedUserResponse {
  readonly accessToken: string;
  readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  static from(data: AuthenticatedUser): AuthenticatedUserResponse {
    return new AuthenticatedUserResponse(data.accessToken, data.refreshToken);
  }
}
