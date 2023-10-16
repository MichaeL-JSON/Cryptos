import { PickType } from '@nestjs/swagger'
import { CreateUserDto } from '@app/user/dto/create-user.dto'

export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
] as const) {}
