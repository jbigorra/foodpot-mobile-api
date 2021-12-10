import { Module } from "@nestjs/common";
import { ServerConfigModule } from "../../shared/modules/config/server.config.module";
import { VendorModule } from "../../shared/modules/vendor/vendor.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [ServerConfigModule, VendorModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
