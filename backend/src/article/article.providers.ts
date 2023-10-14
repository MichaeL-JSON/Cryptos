import { ARTICLE_REPOSITORY, DATA_SOURCE } from '@app/constants/constants'
import { DataSource } from 'typeorm'
import { ArticleEntity } from '@app/article/entities/article.entity'

export const articleProviders = [
  {
    provide: ARTICLE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArticleEntity),

    inject: [DATA_SOURCE],
  },
]
