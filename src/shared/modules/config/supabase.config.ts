import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SupabaseConfig {
  constructor(private configService: ConfigService) {}

  get apiUrl(): string {
    return this.configService.get<string>("supabase.apiUrl");
  }

  get publicApiKey(): string {
    return this.configService.get<string>("supabase.publicApiKey");
  }

  get databaseUrl(): string {
    return this.configService.get<string>("supabase.databaseUrl");
  }
}
