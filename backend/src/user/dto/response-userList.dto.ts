import { UserEntity } from '@app/user/entities/user.entity'
import { IsNotEmptyObject } from 'class-validator'

export class ResponseUserListDto {
  @IsNotEmptyObject()
  readonly users: UserEntity[]
}
