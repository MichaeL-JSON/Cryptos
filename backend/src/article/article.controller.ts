import { Controller, Get } from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('articles')
  async getArticles() {
    this.articleService.getArticles()
  }
}
