import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  getHello(): string {
    return "Hello! It's a Cryptos Project API!"
  }

  async sendMail() {
    await this.mailerService.sendMail({
      to: 'al-1980@inbox.ru',
      from: 'cryptos-node-mailer@mail.ru',
      subject: 'Testing NestJS MailerModule',
      html: '<h1>Test NestJS MailerModule</h1>',
    })
  }
}
