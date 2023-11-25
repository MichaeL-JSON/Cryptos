import { PickType } from '@nestjs/swagger'
import { SequreUserDataDto } from '@app/user/dto/sequre-user-data.dto'

export class LogoutUserDto extends PickType(SequreUserDataDto, [
  'id',
] as const) {}
