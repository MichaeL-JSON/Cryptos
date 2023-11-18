import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from '@app/user/entities/user.entity'
import * as jwt from 'jsonwebtoken'
import * as process from 'process'
import { TOKEN_REPOSITORY } from '@app/constants/constants'
import { Equal, Repository } from 'typeorm'
import { TokenEntity } from '@app/token/entities/token.entity'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {
  }

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

  generateJwt(user: UserEntity): string {
    return jwt.sign({ ...user }, process.env.JWT_ACCESS_SECRET)
  }

  async saveRefreshToken(user: UserEntity, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId: Equal(user.id) },
      relations: { userId: true },
    })

    //Обновление refreshToken аутентифицированного пользователя
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await this.tokenRepository.save(tokenData)
    }

    //Сохранение refreshToken в БД при успешной аутентификации пользователя
    const newToken = await this.tokenRepository.create({
      userId: user,
      refreshToken: refreshToken,
    })

    return this.tokenRepository.save(newToken)
  }
}
