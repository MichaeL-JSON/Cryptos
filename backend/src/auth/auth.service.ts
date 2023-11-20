import { Injectable } from '@nestjs/common'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { UserService } from '@app/user/user.service'
import { ResponseUserDataDto } from '@app/user/dto/response-user- data.dto'
import { MailerService } from '@nestjs-modules/mailer'
import { AppMailerModule } from '@app/app-mailer/app-mailer.module'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'

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

      delete newUser.token

      return {
        ...tokens,
        user: newUser,
      }
    }
  }

  async loginUser() {}

  // eslint-disable-next-line prettier/prettier
  async logoutUser() {
  }

  async activateUser() {}

  // eslint-disable-next-line
  async refreshAccessToken() {
  }

  async getUsers() {}
}
