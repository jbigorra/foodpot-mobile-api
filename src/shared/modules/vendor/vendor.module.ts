import { Module } from "@nestjs/common";
import { ServerConfigModule } from "../config/server.config.module";
import {
  supabaseProvider,
  SUPABASE_CLIENT
} from "./supabase/supabase.provider";

@Module({
  imports: [ServerConfigModule],
  providers: [supabaseProvider],
  exports: [SUPABASE_CLIENT]
})
export class VendorModule {}
