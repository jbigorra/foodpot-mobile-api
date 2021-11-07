import { SupabaseConfig } from "../../modules/config/supabase.config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_CLIENT = "SUPABASE_CLIENT";
export const supabaseProvider = {
  provide: SUPABASE_CLIENT,
  useFactory: (config: SupabaseConfig): SupabaseClient => {
    return createClient(config.apiUrl, config.publicApiKey);
  },
  inject: [SupabaseConfig]
};
