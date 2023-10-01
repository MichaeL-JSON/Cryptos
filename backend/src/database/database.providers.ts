import { ConfigService } from '@nestjs/config'
import { DATA_SOURCE } from '@app/constants/constants'
import { DataSource } from 'typeorm'
import * as process from 'process'

/* Выбор хоста в зависимости от режима разработки
(в контейнере Docker не работает "горячая перезагрузка" NextJS*/
const currentHost = process.env.IS_FRONTEND_DEVELOPMENT_MODE
  ? 'postgres_server'
  : 'localhost'

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.getOrThrow('DB_TYPE') as 'postgres',
        host: currentHost,
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('POSTGRES_DB').toString(),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      })

      return dataSource.initialize()
    },
    inject: [ConfigService],
  },
]
