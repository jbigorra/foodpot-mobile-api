import { HttpException, Inject, Injectable } from "@nestjs/common";
import { SupabaseClient, User, UserAttributes } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../shared/vendors/supabase/supabase.provider";

export type AuthenticatedUser = { accessToken: string; refreshToken: string };
type SupabaseAuthError = { message: string; status: number };

@Injectable()
export class AuthService {
  constructor(@Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient) {}

  async signUpWithEmail(email: string, password: string): Promise<User> {
    const { error, data } = await this.supabase.auth.api.signUpWithEmail(
      email,
      password
    );

    if (error) this._handleError(error);

    return data as unknown as User;
  }

  async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const { error, data } = await this.supabase.auth.api.signInWithEmail(
      email,
      password
    );

    if (error) this._handleError(error);

    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  }

  async signOut(accessToken: string): Promise<Error | void> {
    const { error } = await this.supabase.auth.api.signOut(accessToken);

    if (error) this._handleError(error);
  }

  async refreshSession(refreshToken: string): Promise<AuthenticatedUser> {
    const { data, error } = await this.supabase.auth.api.refreshAccessToken(
      refreshToken
    );

    if (error) this._handleError(error);

    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  }

  async updateUser(jwt: string, userData: { fullname: string }): Promise<User> {
    const userAttributes = { data: userData } as UserAttributes;
    const { data, error } = await this.supabase.auth.api.updateUser(
      jwt,
      userAttributes
    );

    if (error) this._handleError(error);

    return data;
  }

  async getUser(accessToken: string): Promise<User> {
    const { data, error } = await this.supabase.auth.api.getUser(accessToken);

    if (error) this._handleError(error);

    return data;
  }

  private _handleError(error: Error): void {
    const e = error as unknown as SupabaseAuthError;
    throw new HttpException(e.message, e.status);
  }
}
