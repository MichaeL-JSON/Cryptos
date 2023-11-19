import { OmitType } from '@nestjs/swagger'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { IsNotEmpty } from 'class-validator'

export class SequreUserDataDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty()
  readonly id: number

  @IsNotEmpty()
  readonly active: boolean

  @IsNotEmpty()
  readonly createdAt: Date

  @IsNotEmpty()
  readonly updatedAt: Date
}
