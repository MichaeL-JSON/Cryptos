import { MAILER_CONFIG } from '@app/constants/constants'
import { ConfigService } from '@nestjs/config'

export const mailerModuleConnectionConfig = {
  provide: MAILER_CONFIG,
  useFactory: (configService: ConfigService) => {
    return {
      transport: {
        host: `smtp.${configService.getOrThrow('MAIL_DOMEN')}`,
        auth: {
          user: configService.getOrThrow('MAIL_USER'),
          //Пароль для приложения
          pass: configService.getOrThrow('MAIL_PASSWORD'),
          // pass: 'qYh-jqL-Q9d-jPE',
        },
      },
    }
  },
  inject: [ConfigService],
}
