import { Injectable } from '@nestjs/common'
import { UserEntity } from '@app/user/entities/user.entity'
import * as jwt from 'jsonwebtoken'
import process from 'process'

@Injectable()
export class TokenService {
  generateTokens(user: UserEntity) {
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    })

    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
      //Если пользователь не заходил на сайт в течение этого времени, ему нужно будет снова делать login
      expiresIn: '5d',
    })

    return { accessToken, refreshToken }
  }
}
