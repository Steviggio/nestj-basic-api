import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { userProviders } from "./users.providers";
import { DatabaseModule } from "src/Database/database.module";
import { AuthMiddleware } from "src/middlewares/auth/auth.middleware";
import { EncryptionMiddleware } from "src/middlewares/encryption.middleware";
// import { AuthService } from "src/auth/auth.service";
// import { AuthModule } from "src/auth/auth.module";
// import { JwtAuthModule } from "src/auth/auth.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes("api/auth/login")

    consumer
      .apply(EncryptionMiddleware)
      .forRoutes("api/auth/signup");
  }
}