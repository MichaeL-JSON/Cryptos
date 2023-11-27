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
  async generateJwtTokens(
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

  async generateActivationToken(user: UserEntity): Promise<string> {
    return await bcrypt.hash(user.email, 10)
  }

  validateToken(refreshToken: string, secret): SequreCreateUserDto | null {
    try {
      return jwt.verify(refreshToken, secret) as SequreCreateUserDto
    } catch (e) {
      return null
    }
  }

  async setRefreshToken(tokenId: number, userTokens: IToken) {
    const queryBuilder = this.tokenRepository
      .createQueryBuilder()
      .update(TokenEntity)
      .set({
        refreshToken: userTokens.refreshToken,
      })
      .where('id = :tokenId', { tokenId })
      .execute()
    return queryBuilder
  }

  async setActivationToken(tokenId: number, activationToken: string) {
    const queryBuilder = this.tokenRepository
      .createQueryBuilder()
      .update(TokenEntity)
      .set({
        activationToken,
      })
      .where('id = :tokenId', { tokenId })
      .execute()
    return queryBuilder
  }

  createToken(jwtTokens: IToken, activationToken: string): TokenEntity {
    return this.tokenRepository.create({
      refreshToken: jwtTokens.refreshToken,
      activationToken,
    })
  }
}
