import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module'
import { UserModule } from '@app/user/user.module'
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware'
import { AuthController } from './auth/auth.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      //Обрабатывает все маршруты и HTTP-глаголы. Можно передать контроллер.
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
