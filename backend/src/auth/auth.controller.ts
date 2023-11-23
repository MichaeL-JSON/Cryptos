import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express'
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

@ApiTags('Auth')
@ApiExtraModels(CreateUserDto, ResponseUserDataDto)
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
  @Post('logout')
  async logoutUser() {}

  //Обновление access-token путём получения refresh-token
  @Get('refresh')
  async refreshAccessToken() {}

  //Тестовый эндпойнт, доступный только авторизованным пользователям
  @Get('users')
  async getUsers() {}
}
