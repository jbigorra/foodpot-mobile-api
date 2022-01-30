import { Module } from "@nestjs/common";
import configuration from "./main.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SupabaseConfig } from "./supabase.config";
import { ServerConfig } from "./server.config";
import { serverConfigValidationSchema } from "./server-config.validation-schema";

const envFileMap = {
  // local: ".environment/.env.local",
  dev: ".environment/.env.dev",
  prod: ".environment/.env.prod"
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: serverConfigValidationSchema,
      envFilePath: envFileMap[process.env.NODE_ENV] || envFileMap.dev
    })
  ],
  providers: [ConfigService, SupabaseConfig, ServerConfig],
  exports: [ConfigService, SupabaseConfig, ServerConfig]
})
export class ServerConfigModule {}
