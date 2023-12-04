import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { Exclude } from 'class-transformer'

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @Exclude({ toPlainOnly: true })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  readonly password: string

  readonly avatar: string
}
