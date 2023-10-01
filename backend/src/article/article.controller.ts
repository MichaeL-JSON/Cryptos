import { Controller, Get } from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'
import { ArticleEntity } from '@app/article/entities/article.entity'

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('articles/fetch')
  async saveArticlesToDb() {
    this.articleService.saveArticlesToDb()
  }

  @Get('/articles')
  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleService.findAll()
  }
}
