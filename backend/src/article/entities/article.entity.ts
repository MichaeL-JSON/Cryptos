import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/*enum Ticker {
  'NASDAQ:CSCO',
  'NASDAQ:SPLK',
  'NASDAQ:NCNO'
}*/

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '' })
  slug: string

  @Column({ unique: true })
  title: string

  @Column()
  date: Date

  //При создании записи в БД значение будет присвоено автоматически
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column('simple-array', { default: [] })
  tagList: string[]

  @Column({ default: 0 })
  favoritesCount: number

  @Column({ default: '' })
  content: string

  @Column()
  tickers: string

  @Column()
  image: string

  @Column()
  link: string

  @Column()
  author: string

  @Column()
  site: string

  //Автоматическое заполнение поля при обновлении записи
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }
}
