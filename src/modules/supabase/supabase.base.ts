import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseConfig } from "../../shared/modules/config/supabase.config";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/main/lib/SupabaseAuthClient";
import { SupabaseStorageClient } from "@supabase/storage-js";
import { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";

@Injectable()
export class Supabase {
  private _client: SupabaseClient;

  constructor(private supabaseConfig: SupabaseConfig) {
    this._client = createClient(
      supabaseConfig.apiUrl,
      supabaseConfig.publicApiKey,
      {
        autoRefreshToken: true,
        persistSession: true
      }
    );
  }

  auth(): SupabaseAuthClient {
    return this._client.auth;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  storage(): SupabaseStorageClient {
    return this._client.storage;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from<T = any>(table: string): SupabaseQueryBuilder<T> {
    return this._client.from<T>(table);
  }
}
