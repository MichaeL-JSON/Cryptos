import { IsNotEmpty, IsNotEmptyObject } from 'class-validator'
import { SequreUserDataDto } from '@app/user/dto/sequre-user-data.dto'

export class ResponseUserDataDto {
  @IsNotEmpty()
  readonly accessToken: string

  @IsNotEmpty()
  readonly refreshToken: string

  @IsNotEmptyObject()
  readonly user: SequreUserDataDto
}
