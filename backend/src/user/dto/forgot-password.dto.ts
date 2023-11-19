import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { PickType } from '@nestjs/swagger'

export class ForgotPasswordDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
