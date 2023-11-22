import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
// import { UserEntity } from '@app/user/entities/user.entity'
import { UserEntity } from './../../user/entities/user.entity'

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'refresh_token', nullable: false, default: '' })
  refreshToken: string

  @Column({ name: 'activation_token', nullable: false, default: '' })
  activationToken: string

  @OneToOne(() => UserEntity, (user) => user.token)
  user: UserEntity
}
