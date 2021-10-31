import { Module } from "@nestjs/common";
import { ServerConfigModule } from "./shared/modules/config/server.config.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { DbModule } from "./shared/modules/database/db.module";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";

@Module({
  imports: [ServerConfigModule, RecipesModule, DbModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AppModule {}
