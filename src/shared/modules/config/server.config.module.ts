import { Module } from "@nestjs/common";
import configuration from "./main.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { serverConfigValidationSchema } from "./server-config.validation-schema";
import { SupabaseConfig } from "./supabase.config";
import { ServerConfig } from "./server.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: serverConfigValidationSchema
    })
  ],
  providers: [ConfigService, SupabaseConfig, ServerConfig],
  exports: [ConfigService, SupabaseConfig, ServerConfig]
})
export class AppConfigModule {}
