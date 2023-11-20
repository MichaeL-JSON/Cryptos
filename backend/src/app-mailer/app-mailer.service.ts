import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { RecipientType } from '@app/app-mailer/types/recipient.type'
import { ConfigService } from '@nestjs/config'
import { UserEntity } from '@app/user/entities/user.entity'

@Injectable()
export class AppMailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(
    html: string = 'It is fine!',
    recipient: RecipientType = {
      email: 'al-1980@inbox.ru',
      username: 'Alexey',
    },
  ) {
    await this.mailerService.sendMail({
      to: recipient.email,
      // from: 'cryptos-node-mailer@mail.ru',
      from: `${this.configService.getOrThrow(
        'MAIL_USER',
      )}@${this.configService.getOrThrow('MAIL_HOST')}`,
      subject: 'Testing NestJS MailerModule',
      html:
        `<h3>Hello, ${recipient.username}</h3>` +
        `<p>This message was sent from NestJS Mailer. There is no need to answer it.</p>` +
        `<div>${html}</div>` +
        `<p>Date: ${new Date()}</p>`,
    })
  }

  generateHtmlRegistrationMessage(newUser: Omit<UserEntity, 'password'>) {
    return `
        <p>You were registered under the name ${
          newUser.username
        } on the site Cryptos!</p>
        <p>Please, use this link to <a href='${this.generateActivationLink(
          newUser,
        )}'>confirm registration and activate your account!</a></p>`
  }

  generateActivationLink(newUser: Omit<UserEntity, 'password'>) {
    return `http://${this.configService.get(
      'API_HOST',
    )}:5000/api/user/activate?id=${newUser.id}&token=${newUser.activationToken}`
  }

  sendActivationMail(newUser: Omit<UserEntity, 'password'>) {
    const htmlRegistrationMessage =
      this.generateHtmlRegistrationMessage(newUser)
    this.sendMail(htmlRegistrationMessage, {
      email: newUser.email,
      username: newUser.username,
    })
  }
}
