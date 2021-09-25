import { Injectable } from "@nestjs/common";
import { Supabase } from "./supabase.base";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";
import { Session, User, UserCredentials } from "@supabase/supabase-js";

@Injectable()
export class SupabaseAuth {
  private _auth: SupabaseAuthClient;

  constructor(private supabase: Supabase) {
    this._auth = this.supabase.auth();
  }

  signUp(
    email: string,
    password: string
  ): Promise<{
    user: User;
    session: Session;
    error: Error;
    data: User | Session;
  }> {
    return this._auth.signUp({ email, password });
  }
}
