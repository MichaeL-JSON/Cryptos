import { PickType } from '@nestjs/swagger'
import { CreateUserDto } from '@app/user/dto/create-user.dto'

export class RecipientType extends PickType(CreateUserDto, [
  'email',
  'username',
] as const) {}
