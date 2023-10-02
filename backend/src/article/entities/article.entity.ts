import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/*enum Ticker {
  'NASDAQ:CSCO',
  'NASDAQ:SPLK',
  'NASDAQ:NCNO'
}*/

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  title: string

  @Column()
  date: Date

  @Column()
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
}
