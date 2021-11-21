import { Module } from "@nestjs/common";
import { AuthModule } from "../auth";
import { UsersController } from ".";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: []
})
export class UsersModule {}
