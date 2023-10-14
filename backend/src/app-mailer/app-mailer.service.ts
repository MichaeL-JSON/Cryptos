import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    await this.mailerService.sendMail({
      to: 'al-1980@inbox.ru',
      from: 'cryptos-node-mailer@mail.ru',
      subject: 'Testing NestJS MailerModule',
      html:
        '<h1>Test NestJS MailerModule</h1>' + `<h2>Date: ${new Date()}</h2>`,
    })
  }
}
