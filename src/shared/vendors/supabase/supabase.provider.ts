import { SupabaseConfig } from "../../modules/config/supabase.config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseProvider = {
  provide: SupabaseClient,
  useFactory: (config: SupabaseConfig): SupabaseClient => {
    return createClient(config.apiUrl, config.publicApiKey);
  },
  inject: [SupabaseConfig]
};
