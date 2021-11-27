import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";

@Module({
  imports: [ServerConfigModule],
  controllers: [PublicController]
})
export class PublicModule {}
