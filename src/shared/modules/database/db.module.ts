import { Module } from "@nestjs/common";
import { DbClient } from ".";

@Module({
  providers: [DbClient],
  exports: [DbClient]
})
export class DbModule {}
