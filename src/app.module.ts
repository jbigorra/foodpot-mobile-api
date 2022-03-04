import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { AuthMiddleware } from "./middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { PublicModule } from "./modules/public/public.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { UsersModule } from "./modules/users/users.module";
import { ServerConfig } from "./shared/modules/config/server.config";
import { ServerConfigModule } from "./shared/modules/config/server.config.module";
import { DbModule } from "./shared/modules/database/db.module";
import { VendorModule } from "./shared/modules/vendor/vendor.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDbConfig } from "./shared/modules/config/mongodb.config";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ServerConfigModule],
      inject: [ServerConfig],
      useFactory: async (config: ServerConfig) => {
        return {
          pinoHttp: { level: config.logLevel }
        };
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ServerConfigModule],
      inject: [MongoDbConfig],
      useFactory: async (config: MongoDbConfig) => {
        return {
          uri: config.databaseUrl
        };
      }
    }),
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
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true
      })
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
