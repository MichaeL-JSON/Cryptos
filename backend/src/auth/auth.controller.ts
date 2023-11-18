import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { AuthService } from '@app/auth/auth.service'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from "@app/user/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registrateUser(@Body('user') createUserDto: CreateUserDto) {

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
