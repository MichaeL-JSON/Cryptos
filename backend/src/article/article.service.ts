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

  async fetchArticles() {
    const url =
      this.configService.getOrThrow('API_URL') +
      this.configService.getOrThrow('API_KEY')
    const res = await fetch(url)
    const json = await res.json()
    return json
  }

  async saveArticlesToDb() {
    const { content } = await this.fetchArticles()
    if (!content) {
      return
    }
    // await this.articleRepository.save(content)
    await this.articleRepository
      .createQueryBuilder()
      .insert()
      .into(ArticleEntity)
      .values(content)
      .orIgnore()
      .execute()

    console.log('Store articles')
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find()
  }
}
