import { IsEmail, IsNotEmpty } from 'class-validator'
import { Exclude } from 'class-transformer'

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  readonly password: string

  readonly avatar: string
}
