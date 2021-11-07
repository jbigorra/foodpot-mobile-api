import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { supabaseProvider } from "../../shared/vendors/supabase/supabase.provider";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";
import { SupabaseConfig } from "../../shared/modules/config/supabase.config";

@Module({
  imports: [AuthModule, ServerConfigModule],
  controllers: [UsersController],
  providers: [AuthService, supabaseProvider, SupabaseConfig]
})
export class UsersModule {}
