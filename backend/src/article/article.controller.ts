import { Controller, Get, Param, Post } from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'
import { ArticleEntity } from '@app/article/entities/article.entity'

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('fetch')
  async saveArticlesToDb() {
    return await this.articleService.saveArticlesToDb()
  }

  @Get()
  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleService.findAll()
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<ArticleEntity> {
    return this.articleService.getOne(id)
  }

  @Post()
  async create() {
    return this.articleService.createArticle()
  }
}
