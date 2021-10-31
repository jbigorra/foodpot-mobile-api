import { HttpException, Injectable } from "@nestjs/common";
import { SupabaseConfig } from "../../shared/modules/config/supabase.config";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

export type AuthenticatedUser = { accessToken: string; refreshToken: string };
type SupabaseAuthError = { message: string; status: number };

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private supabaseConfig: SupabaseConfig) {
    this.supabase = createClient(
      supabaseConfig.apiUrl,
      supabaseConfig.publicApiKey
    );
  }

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

  private _handleError(error: Error): void {
    const e = error as unknown as SupabaseAuthError;
    throw new HttpException({ error: e.message }, e.status);
  }
}
