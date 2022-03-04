import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongoDbConfig {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>("mongodb.databaseUrl");
  }
}
