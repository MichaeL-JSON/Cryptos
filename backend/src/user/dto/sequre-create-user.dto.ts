import { OmitType } from '@nestjs/swagger'
import { CreateUserDto } from '@app/user/dto/create-user.dto'

export class SequreCreateUserDto extends OmitType(CreateUserDto, [
  'password',
]) {}
