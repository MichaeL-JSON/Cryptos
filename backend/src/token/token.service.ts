import { Inject, Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import * as process from 'process'
import { TOKEN_REPOSITORY } from '@app/constants/constants'
import { Repository } from 'typeorm'
import { TokenEntity } from '@app/token/entities/token.entity'
import { SequreCreateUserDto } from '@app/user/dto/sequre-create-user.dto'
import * as bcrypt from 'bcrypt'
import { IToken } from '@app/common/interfaces/itoken.interface'
import { UserEntity } from '@app/user/entities/user.entity'

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  generateJwtToken(
    sequreCreateUserDto: SequreCreateUserDto,
    jwtSecret: string,
    lifetime: number,
  ): string {
    return jwt.sign({ ...sequreCreateUserDto }, jwtSecret, {
      //Время жизни accessToken составляет 15 минут
      expiresIn: lifetime,
    })
  }

  /**
   * Генерация JWT-токенов
   * Вызывается при успешной регистрации или аутентификации
   * @param sequreCreateUserDto: SequreCreateUserDto
   */
  async generateTokens(
    sequreCreateUserDto: SequreCreateUserDto,
  ): Promise<IToken> {
    const accessToken: string = this.generateJwtToken(
      sequreCreateUserDto,
      process.env.JWT_ACCESS_SECRET,
      parseInt(process.env.JWT_ACCESS_LIFETIME),
    )

    const refreshToken: string = this.generateJwtToken(
      sequreCreateUserDto,
      process.env.JWT_REFRESH_SECRET,
      parseInt(process.env.JWT_REFRESH_LIFETIME),
    )

    const activationToken = await bcrypt.hash(sequreCreateUserDto.email, 10)

    return { accessToken, refreshToken, activationToken }
  }

  async createTokens(
    tokens: Omit<IToken, 'accessToken'>,
  ): Promise<TokenEntity> {
    return this.tokenRepository.create(tokens)
  }

  validateToken(refreshToken: string, secret): UserEntity | null {
    try {
      return jwt.verify(refreshToken, secret) as UserEntity
    } catch (e) {
      return null
    }
  }
}
