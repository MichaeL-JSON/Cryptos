import { Injectable, UnauthorizedException } from '@nestjs/common'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { UserService } from '@app/user/user.service'
import { ResponseUserDataDto } from '@app/user/dto/response-user- data.dto'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { UserEntity } from '@app/user/entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly appMailerService: AppMailerService,
  ) {}

  async registrateUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseUserDataDto> {
    const newUser = await this.userService.create(createUserDto)
    if (newUser) {
      delete newUser?.password

      const tokens = this.tokenService.generateTokens(newUser)
      await this.tokenService.saveRefreshToken(newUser, tokens.refreshToken)

      this.appMailerService.sendActivationMail(newUser)

      delete newUser.activationToken

      return {
        ...tokens,
        user: newUser,
      }
    }
  }

  async activateUser(userId: number, activationToken: string): Promise<string> {
    return await this.userService.activate(userId, activationToken)
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const dbUser: UserEntity = await this.userService.findOneByEmail(
      loginUserDto.email,
      ['id', 'username', 'email', 'password', 'avatar'],
    )
    console.log(dbUser)
    if (
      !dbUser ||
      !(await bcrypt.compare(loginUserDto.password, dbUser.password))
    ) {
      throw new UnauthorizedException()
    }

    //Удаляем свойство password из объекта, содержащего данные пользователя
    delete dbUser.password
    return dbUser
  }

  // eslint-disable-next-line prettier/prettier
  async logoutUser() {}

  // eslint-disable-next-line
  async refreshAccessToken() {}

  async getUsers() {}
}
