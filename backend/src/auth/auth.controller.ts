import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from '@app/user/user.service'
import { AuthService } from '@app/auth/auth.service'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { ResponseUserDataDto } from '@app/user/dto/response-user- data.dto'
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { UserEntity } from '@app/user/entities/user.entity'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { LogoutUserDto } from '@app/auth/dto/logout-user.dto'
import { IToken } from '@app/common/interfaces/itoken.interface'

@ApiTags('Auth')
@ApiExtraModels(CreateUserDto, ResponseUserDataDto, LogoutUserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly appMailerService: AppMailerService,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(CreateUserDto),
        },
      },
    },
  })
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registrateUser(
    @Res({ passthrough: true }) response: Response,
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<ResponseUserDataDto> {
    const registeredUser: UserEntity =
      await this.authService.registrateUser(createUserDto)

    if (registeredUser) {
      const userTokens: IToken =
        await this.authService.generateJwtTokens(registeredUser)

      const { accessToken, refreshToken } = userTokens

      const activationToken =
        await this.tokenService.generateActivationToken(registeredUser)

      registeredUser.token = this.tokenService.createToken(
        userTokens,
        activationToken,
      )

      await this.userService.saveUser(registeredUser)

      this.appMailerService.sendActivationMail(registeredUser, activationToken)

      this.authService.setRefreshTokenHttpOnlyCookie(response, refreshToken)

      return this.authService.buildAuthResponse(
        registeredUser,
        accessToken,
        refreshToken,
      )
    }
  }

  //Активация зарегистрированного пользователя
  @Redirect()
  @Get('activate')
  async activateUser(
    @Query('userId') userId: number,
    @Query('activationToken') activationToken: string,
  ) {
    const frontendLoginUrl: string = await this.authService.activateUser(
      userId,
      activationToken,
    )

    //Перенаправление на страницу аутентификации
    return { url: frontendLoginUrl }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(LoginUserDto),
        },
      },
    },
  })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authenticatedUser: UserEntity =
      await this.authService.getAuthenticatedUser(loginUserDto)

    const userTokens: IToken =
      await this.authService.generateJwtTokens(authenticatedUser)

    const { accessToken, refreshToken } = userTokens

    const dbUser: UserEntity = await this.authService.loginUser(
      authenticatedUser,
      userTokens,
    )

    this.authService.setRefreshTokenHttpOnlyCookie(response, refreshToken)

    return this.authService.buildAuthResponse(dbUser, accessToken, refreshToken)
  }

  //Удаление refresh-token из БД
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(LogoutUserDto),
        },
      },
    },
  })
  @HttpCode(205)
  @Post('logout')
  async logoutUser(
    @Body('user') logoutUserDto: LogoutUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies
    await this.authService.logoutUser(logoutUserDto, refreshToken)
    response.clearCookie('refreshToken')
  }

  //Обновление access-token путём получения refresh-token
  @Post('refresh')
  async refreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken: oldRefreshToken } = request.cookies
    const updateableUser: UserEntity =
      await this.authService.getUpdateableUser(oldRefreshToken)

    const userTokens: IToken =
      await this.authService.generateJwtTokens(updateableUser)

    const { accessToken, refreshToken } = userTokens

    await this.authService.refreshJWTTokens(updateableUser, userTokens)

    this.authService.setRefreshTokenHttpOnlyCookie(response, refreshToken)

    return this.authService.buildAuthResponse(
      updateableUser,
      accessToken,
      refreshToken,
    )
  }

  //Тестовый эндпойнт, доступный только авторизованным пользователям
  @Get('users')
  async getUsers() {}
}
