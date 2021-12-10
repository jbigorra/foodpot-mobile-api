import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AuthMiddleware } from "./middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { PublicModule } from "./modules/public/public.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { UsersModule } from "./modules/users/users.module";
import { ServerConfigModule } from "./shared/modules/config/server.config.module";
import { DbModule } from "./shared/modules/database/db.module";
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
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe()
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
