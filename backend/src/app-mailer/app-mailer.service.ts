import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    message: string = 'It is fine!',
    email: string = 'al-1980@inbox.ru',
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: 'cryptos-node-mailer@mail.ru',
      subject: 'Testing NestJS MailerModule',
      html:
        '<h1>Test NestJS MailerModule</h1>' +
        `<h2>${message}</h2>` +
        `<h2>Date: ${new Date()}</h2>`,
    })
  }
}
