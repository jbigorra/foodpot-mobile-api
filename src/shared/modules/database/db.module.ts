import { Module } from "@nestjs/common";
import { DbClient } from "./db.client";

@Module({
  providers: [DbClient],
  exports: [DbClient]
})
export class DbModule {}
