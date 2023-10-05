import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  //select:false предотвращает получение пароля из БД путём find || findOne|| findBy
  @Column({ select: false })
  password: string

  @Column({ default: '' })
  avatar: string

  //Срабатывает перед добавлением записи в БД
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
