import { Module } from '@nestjs/common'
import { mailerModuleConnectionConfig } from '@app/configs/mailer-module-connection.config'
import { MailerModule } from '@nestjs-modules/mailer'
import { AppMailerService } from './app-mailer.service'

@Module({
  imports: [MailerModule.forRootAsync(mailerModuleConnectionConfig)],
  providers: [AppMailerService],
  exports: [AppMailerService],
})
export class AppMailerModule {}
