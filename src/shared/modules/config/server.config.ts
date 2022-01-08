import { Injectable, LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ServerConfig {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>("server.port");
  }

  get apiUrl(): string {
    return this.configService.get<string>("server.apiUrl");
  }

  get logLevel(): LogLevel {
    return this.configService.get<LogLevel>("server.logLevel");
  }
}
