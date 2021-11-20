import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ServerConfigModule } from "./shared/modules/config/server.config.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { DbModule } from "./shared/modules/database/db.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthMiddleware } from "./middleware";
import { PublicModule } from "./modules/public/public.module";
import { VendorModule } from "./shared/modules/vendor/vendor.module";

@Module({
  imports: [
    ServerConfigModule,
    RecipesModule,
    DbModule,
    AuthModule,
    UsersModule,
    PublicModule,
    VendorModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
