import { Inject, Injectable } from '@nestjs/common'
import { ARTICLE_REPOSITORY } from '@app/constants/constants'
import { Repository } from 'typeorm'
import { ArticleEntity } from '@app/article/entities/article.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly configService: ConfigService,
  ) {}

  async getArticles() {
    const url =
      this.configService.getOrThrow('API_URL') +
      this.configService.getOrThrow('API_KEY')
    console.log(url)
    const res = await fetch(url)
    const json = await res.json()
    console.log(json)
  }
}
