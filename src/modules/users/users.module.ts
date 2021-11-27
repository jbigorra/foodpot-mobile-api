import { Module } from "@nestjs/common";
import { UsersController } from ".";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: []
})
export class UsersModule {}
