import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from '@app/user/entities/user.entity'

@Entity({ name: 'tokens' })
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
