import { UserType } from '@app/user/types/user.type'

export interface AuthResponseInterface {
  user: UserType & { token: string }
}
