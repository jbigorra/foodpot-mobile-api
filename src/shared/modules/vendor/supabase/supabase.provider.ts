import { SupabaseConfig } from "../../config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../../../../deps-tokens/tokens";

export enum SupabaseAuthType {
  SIGNUP = "signup",
  MAGICLINK = "magiclink",
  RECOVERY = "recovery",
  INVITE = "invite"
}

export const supabaseProvider = {
  provide: SUPABASE_CLIENT,
  useFactory: (config: SupabaseConfig): SupabaseClient => {
    return createClient(config.apiUrl, config.publicApiKey);
  },
  inject: [SupabaseConfig]
};
