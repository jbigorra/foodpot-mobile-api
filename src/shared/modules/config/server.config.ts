import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ServerConfig {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>("server.port");
  }
}
