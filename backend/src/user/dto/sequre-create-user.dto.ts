import { OmitType } from '@nestjs/swagger'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { IsNotEmpty } from 'class-validator'

export class SequreCreateUserDto extends OmitType(CreateUserDto, ['password']) {
  @IsNotEmpty()
  readonly id?: number

  @IsNotEmpty()
  readonly active?: boolean
}
