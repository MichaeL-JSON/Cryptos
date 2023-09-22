import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/*enum Ticker {
  'NASDAQ:CSCO',
  'NASDAQ:SPLK',
}*/

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  date: Date

  @Column()
  content: string

  /*  @Column()
    tickers: Ticker[]*/

  @Column()
  image: string

  @Column()
  link: string

  @Column()
  author: string

  @Column()
  site: string
}
