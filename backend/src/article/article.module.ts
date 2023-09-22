import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { articleProviders } from '@app/article/article.providers'
import { DatabaseModule } from '@app/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [ArticleService, ...articleProviders],
  controllers: [ArticleController],
})
export class ArticleModule {}
