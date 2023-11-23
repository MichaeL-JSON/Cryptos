import { IsNotEmptyObject } from 'class-validator'
import { SequreUserDataDto } from '@app/user/dto/sequre-user-data.dto'

export class ResponseUserDataDto {
  @IsNotEmptyObject()
  readonly user: SequreUserDataDto
}
