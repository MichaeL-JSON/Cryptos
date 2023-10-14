import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { ArticleModule } from './article/article.module'
import { UserModule } from '@app/user/user.module'
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailerModuleModule } from './mailer-module/mailer-module.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.ru',
        auth: {
          user: 'cryptos-node-mailer@mail.ru',
          //Пароль для приложения
          pass: '9P4buVcXGCgwbUzuQPAh',
          // pass: 'qYh-jqL-Q9d-jPE',
        },
      },
    }),
    DatabaseModule,
    ArticleModule,
    UserModule,
    MailerModuleModule,
  ],
  controllers: [AppController],
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
