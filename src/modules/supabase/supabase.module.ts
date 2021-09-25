import { Module } from "@nestjs/common";
import { Supabase } from "./supabase.base";
import { AppConfigModule } from "../../shared/modules/config/server.config.module";

@Module({
  imports: [AppConfigModule],
  providers: [Supabase],
  exports: [Supabase]
})
export class AuthModule {}
