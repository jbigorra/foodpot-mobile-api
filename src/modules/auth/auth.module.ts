import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";
import { VendorModule } from "../../shared/modules/vendor/vendor.module";

@Module({
  imports: [ServerConfigModule, VendorModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
