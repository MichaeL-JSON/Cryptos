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
    const dbUser: UserEntity =
      await this.authService.registrateUser(createUserDto)

    if (dbUser) {
      console.log('newUser: ', dbUser)
      delete dbUser?.password

      this.appMailerService.sendActivationMail(dbUser)

      this.authService.setCookie(response, dbUser)
      return this.authService.buildAuthResponse(dbUser)
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
    const userData: UserEntity = await this.authService.loginUser(loginUserDto)

    this.authService.setCookie(response, userData)

    return this.authService.buildAuthResponse(userData)
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
    const { refreshToken } = request.cookies
    const userData: UserEntity =
      await this.authService.refreshJWTTokens(refreshToken)

    this.authService.setCookie(response, userData)

    return this.authService.buildAuthResponse(userData)
  }

  //Тестовый эндпойнт, доступный только авторизованным пользователям
  @Get('users')
  async getUsers() {}
}
