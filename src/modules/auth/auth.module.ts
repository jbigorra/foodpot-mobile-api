import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { supabaseProvider } from "../../shared/vendors/supabase/supabase.provider";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";
import { SupabaseConfig } from "../../shared/modules/config/supabase.config";

@Module({
  imports: [ServerConfigModule],
  providers: [AuthService, supabaseProvider, SupabaseConfig],
  controllers: [AuthController]
})
export class AuthModule {}
