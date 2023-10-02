import { DATA_SOURCE, USER_REPOSITORY } from '@app/constants/constants'
import { DataSource } from 'typeorm'
import { UserEntity } from '@app/user/entities/user.entity'

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
]
