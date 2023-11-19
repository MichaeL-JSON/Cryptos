import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
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

@ApiTags('Auth')
@ApiExtraModels(CreateUserDto, ResponseUserDataDto)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
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
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<ResponseUserDataDto> {
    return await this.authService.registrateUser(createUserDto)
  }

  @Post('login')
  async loginUser() {}

  //Удаление refresh-token из БД
  @Post('logout')
  async logoutUser() {}

  //Активация зарегистрированного пользователя
  @Get('activate')
  async activateUser() {}

  //Обновление access-token путём получения refresh-token
  @Get('refresh')
  async refreshAccessToken() {}

  //Тестовый эндпойнт, доступный только авторизованным пользователям
  @Get('users')
  async getUsers() {}
}
