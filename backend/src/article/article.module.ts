import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { articleProviders } from '@app/article/article.providers'
import { DatabaseModule } from '@app/database/database.module'
import { ScheduleModule } from '@nestjs/schedule'
import { CronService } from '@app/article/cron.service'

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot()],
  providers: [ArticleService, CronService, ...articleProviders],
  controllers: [ArticleController],
})
export class ArticleModule {}
