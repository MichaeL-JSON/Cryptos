import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'refresh_token',
    nullable: false,
    default: '',
  })
  refreshToken: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity
}
