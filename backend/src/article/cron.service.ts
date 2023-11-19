import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ArticleService } from '@app/article/article.service'

@Injectable()
export class CronService {
  constructor(private readonly articleService: ArticleService) {}

  @Cron('0 5 * * * *')
  synchronizeArticles() {
    console.log('sync')
    this.articleService.saveArticlesToDb()
  }
}
