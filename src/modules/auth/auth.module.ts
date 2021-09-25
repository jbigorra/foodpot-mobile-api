import { Module } from "@nestjs/common";
import { SupabaseStrategy } from "./supabase.strategy";

@Module({
  imports: [],
  providers: [SupabaseStrategy],
  exports: [SupabaseStrategy]
})
export class AuthModule {}
