import { Inject, Injectable } from '@nestjs/common'
import { UserEntity } from '@app/user/entities/user.entity'
import * as jwt from 'jsonwebtoken'
import * as process from 'process'
import { TOKEN_REPOSITORY } from '@app/constants/constants'
import { Repository } from 'typeorm'
import { TokenEntity } from '@app/token/entities/token.entity'
import { SequreCreateUserDto } from '@app/user/dto/sequre-create-user.dto'
import * as bcrypt from 'bcrypt'
import { IToken } from '@app/common/interfaces/itoken.interface'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  /**
   * Генерация JWT-токенов
   * Вызывается при успешной регистрации или аутентификации
   * @param sequreCreateUserDto: SequreCreateUserDto
   */
  async generateTokens(
    sequreCreateUserDto: SequreCreateUserDto,
  ): Promise<IToken> {
    const accessToken = jwt.sign(
      { ...sequreCreateUserDto },
      process.env.JWT_ACCESS_SECRET,
      {
        //Время жизни accessToken составляет 15 минут
        expiresIn: 900,
      },
    )

    const refreshToken = jwt.sign(
      { ...sequreCreateUserDto },
      process.env.JWT_REFRESH_SECRET,
      {
        //Если пользователь не заходил на сайт в течение этого времени, ему нужно будет снова делать login
        expiresIn: '5d',
      },
    )

    const activationToken = await bcrypt.hash(sequreCreateUserDto.email, 10)

    return { accessToken, refreshToken, activationToken }
  }

  async createTokens(
    tokens: Omit<IToken, 'accessToken'>,
  ): Promise<TokenEntity> {
    return this.tokenRepository.create(tokens)
  }

  generateJwt(user: UserEntity): string {
    return jwt.sign({ ...user }, process.env.JWT_ACCESS_SECRET)
  }

  /*
    /!**
     * Сохранение refreshToken в таблицу tokens.
     * Вызывается при успешной авторизации или аутентификации.
     * @param user UserEntity
     * @param refreshToken
     *!/
    async saveRefreshToken(
      user: SequreUserDataDto,
      refreshToken: string,
    ): Promise<TokenEntity> {
      const tokenData = await this.tokenRepository.findOne({
        where: { userId: Equal(user.id) },
        relations: { userId: true },
      })

      //Обновление refreshToken пользователя при успешной аутентификации
      if (tokenData) {
        tokenData.refreshToken = refreshToken
        return await this.tokenRepository.save(tokenData)
      }

      //Сохранение refreshToken в БД при успешной аутентификации или регистрации пользователя
      const newToken = await this.tokenRepository.create({
        userId: user,
        refreshToken: refreshToken,
      })

      return await this.tokenRepository.save(newToken)
    }*/
}
