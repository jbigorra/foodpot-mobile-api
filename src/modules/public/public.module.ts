import { Module } from "@nestjs/common";
import { ServerConfigModule } from "../../shared/modules/config";
import { PublicController } from "./public.controller";

@Module({
  imports: [ServerConfigModule],
  controllers: [PublicController]
})
export class PublicModule {}
