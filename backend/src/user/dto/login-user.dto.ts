import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { OmitType } from '@nestjs/mapped-types'

export class LoginUserDto extends OmitType(CreateUserDto, [
  'username',
] as const) {}
