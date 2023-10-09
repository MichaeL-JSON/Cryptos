import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'Nickname of user', nullable: false })
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({ description: 'Email of user', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty({ description: 'Password of user', nullable: false })
  @IsNotEmpty()
  readonly password: string

  @ApiProperty({ description: 'Link to users avatar', nullable: true })
  readonly avatar: string
}
