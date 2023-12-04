import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { UserService } from '@app/user/user.service'
import { ResponseUserDataDto } from '@app/user/dto/response-user- data.dto'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { UserEntity } from '@app/user/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { IToken } from '@app/common/interfaces/itoken.interface'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { SequreCreateUserDto } from '@app/user/dto/sequre-create-user.dto'
import { Response } from 'express'
import * as process from 'process'
import { LogoutUserDto } from '@app/auth/dto/logout-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async registrateUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (await this.userService.existsUser(createUserDto)) {
      throw new HttpException(
        'Email address or username is already taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    return await this.userService.create(createUserDto)
  }

  async activateUser(userId: number, activationToken: string): Promise<string> {
    return await this.userService.activate(userId, activationToken)
  }

  async getAuthenticatedUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const dbUser: UserEntity = await this.userService.findOneByEmail(
      loginUserDto.email,
      ['id', 'username', 'email', 'active', 'password', 'avatar', 'token'],
    )

    if (
      !dbUser ||
      !(await bcrypt.compare(loginUserDto.password, dbUser.password))
    ) {
      throw new UnauthorizedException()
    }

    return dbUser
  }

  async loginUser(user: UserEntity, userTokens: IToken): Promise<UserEntity> {
    // const tokenId = parseInt(sequreCreateUserDto.token)

    await this.tokenService.setRefreshToken(user.token.id, userTokens)

    return await this.userService.findOneByEmail(user.email)
  }

  // eslint-disable-next-line prettier/prettier
  async logoutUser(
    logoutUserDto: LogoutUserDto,
    refreshToken: string,
  ): Promise<void> {
    await this.userService.removeRefreshToken(logoutUserDto, refreshToken)
  }

  async refreshJWTTokens(user: UserEntity, userTokens: IToken) {
    await this.tokenService.setRefreshToken(user.token.id, userTokens)
  }

  async getUpdateableUser(refreshToken: string): Promise<UserEntity> {
    if (!refreshToken) {
      throw new UnauthorizedException('RefreshToken not received')
    }

    const tokenUserData = this.tokenService.validateToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    )

    if (!tokenUserData) {
      throw new UnauthorizedException('The token has expired')
    }

    const dbUser = await this.userService.findOneById(tokenUserData.id)

    if (
      !dbUser.token.refreshToken ||
      dbUser.token.refreshToken !== refreshToken
    ) {
      throw new UnauthorizedException()
    }
    return dbUser
  }

  async getUsers() {}

  buildAuthResponse(
    dbUser: UserEntity,
    accessToken: string,
    refreshToken: string,
  ): ResponseUserDataDto {
    delete dbUser.password
    delete dbUser.token
    return { user: { ...dbUser, accessToken, refreshToken } }
  }

  setRefreshTokenHttpOnlyCookie(
    response: Response,
    refreshToken: string,
  ): Response {
    //Добавление в ответ httpOnly-cookie, значение которого невозможно изменять и получать внутри браузера с помощью JS
    return response.cookie('refreshToken', refreshToken, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
  }

  /*  Преобразование экземпляра класса CreateUserDto в экземпляр класса
SequreCreateUserDto с помощью декоратора @Exclude({ toPlainOnly: true })
свойства password в  CreateUserDto для исключения передачи конфиденциальных данных в JWT-токен*/
  prepareSequreUserData(createUserDto: CreateUserDto): SequreCreateUserDto {
    const plainCreateUserDto = instanceToPlain(createUserDto)
    delete plainCreateUserDto.password
    delete plainCreateUserDto.token

    return plainToInstance(SequreCreateUserDto, plainCreateUserDto)
  }

  async generateJwtTokens(user: UserEntity): Promise<IToken> {
    return await this.tokenService.generateJwtTokens(
      this.prepareSequreUserData(user),
    )
  }
}
