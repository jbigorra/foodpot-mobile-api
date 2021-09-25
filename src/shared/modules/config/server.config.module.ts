import { Module } from "@nestjs/common";
import configuration from "./main.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { serverConfigValidationSchema } from "./server-config.validation-schema";
import { SupabaseConfig } from "./supabase.config";
import { ServerConfig } from "./server.config";

const envFileMap = {
  local: ".env/.env.local",
  dev: ".env/.env.dev",
  prod: ".env/.env.prod"
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: serverConfigValidationSchema,
      envFilePath: envFileMap[process.env.NODE_ENV] || envFileMap.local
    })
  ],
  providers: [ConfigService, SupabaseConfig, ServerConfig],
  exports: [ConfigService, SupabaseConfig, ServerConfig]
})
export class AppConfigModule {}
