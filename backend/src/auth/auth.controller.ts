import { Controller, Get, Post } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { AuthService } from '@app/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('registration')
  async registrateUser() {}

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
