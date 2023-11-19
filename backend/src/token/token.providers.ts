import { DATA_SOURCE, TOKEN_REPOSITORY } from '@app/constants/constants'
import { DataSource } from 'typeorm'
import { TokenEntity } from '@app/token/entities/token.entity'

export const tokenProviders = [
  {
    provide: TOKEN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TokenEntity),
    inject: [DATA_SOURCE],
  },
]
