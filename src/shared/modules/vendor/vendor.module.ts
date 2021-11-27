import { Module } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../../../deps-tokens/tokens";
import { ServerConfigModule } from "../config/server.config.module";
import { supabaseProvider } from "./supabase/supabase.provider";

@Module({
  imports: [ServerConfigModule],
  providers: [supabaseProvider],
  exports: [SUPABASE_CLIENT]
})
export class VendorModule {}
