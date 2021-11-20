import { HttpException, Inject, Injectable } from "@nestjs/common";
import { SupabaseClient, User, UserAttributes } from "@supabase/supabase-js";
import { ServerConfig } from "../../shared/modules/config/server.config";
import { SUPABASE_CLIENT } from "../../shared/modules/vendor/supabase/supabase.provider";

export type AuthenticatedUser = { accessToken: string; refreshToken: string };
type SupabaseAuthError = { message: string; status: number };

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly serverConfig: ServerConfig
  ) {}

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

  async updatePassword(jwt: string, password: string): Promise<User> {
    const userAttributes = { password: password } as UserAttributes;

    const { data, error } = await this.supabase.auth.api.updateUser(
      jwt,
      userAttributes
    );

    if (error) this._handleError(error);

    return data;
  }

  async updateEmail(jwt: string, email: string): Promise<User> {
    const userAttributes = { email: email } as UserAttributes;

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

  async recoverAccountFor(email: string): Promise<void> {
    const { error } = await this.supabase.auth.api.resetPasswordForEmail(
      email,
      {
        redirectTo: `${this.serverConfig.apiUrl}/public/redirect-auth`
      }
    );

    if (error) this._handleError(error);

    return;
  }

  private _handleError(error: Error): void {
    const e = error as unknown as SupabaseAuthError;
    throw new HttpException(e.message, e.status);
  }
}
