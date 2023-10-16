import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ description: 'User Id', nullable: false })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'Nickname of user', nullable: false })
  @Column()
  username: string

  @ApiProperty({ description: 'Email of user', nullable: false })
  @Column({ unique: true })
  email: string

  @ApiProperty({ description: 'Password of user', nullable: false })
  //select:false предотвращает получение пароля из БД путём find || findOne|| findBy
  @Column({ select: false })
  password: string

  @ApiProperty({ description: 'Link to users avatar', nullable: true })
  @Column({ default: '' })
  avatar: string

  @Column({ name: 'forgot_password_token', default: '' })
  forgotPasswordToken: string

  //Срабатывает перед добавлением записи в БД
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
