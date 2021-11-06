import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ServerConfigModule } from "./shared/modules/config/server.config.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { DbModule } from "./shared/modules/database/db.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthMiddleware } from "./middleware";

@Module({
  imports: [ServerConfigModule, RecipesModule, DbModule, AuthModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
