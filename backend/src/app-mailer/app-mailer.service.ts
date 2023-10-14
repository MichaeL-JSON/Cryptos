import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { RecipientType } from '@app/app-mailer/types/recipient.type'

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    message: string = 'It is fine!',
    recipient: RecipientType = {
      email: 'al-1980@inbox.ru',
      username: 'Alexey',
    },
  ) {
    await this.mailerService.sendMail({
      to: recipient.email,
      from: 'cryptos-node-mailer@mail.ru',
      subject: 'Testing NestJS MailerModule',
      html:
        `<h3>Hello, ${recipient.username}</h3>` +
        `<p>This message was sent from NestJS Mailer. There is no need to answer it.</p>` +
        `<p>${message}</p>` +
        `<p>Date: ${new Date()}</p>`,
    })
  }
}
