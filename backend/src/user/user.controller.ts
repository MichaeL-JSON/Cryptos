import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { User } from '@app/user/decorators/user.decorator'
import { UserEntity } from '@app/user/entities/user.entity'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { ApiBody, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly appMailerService: AppMailerService,
  ) {}

  @ApiBody({ type: [CreateUserDto] })
  @Post('users')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const newUser = await this.userService.create(createUserDto)
    return this.userService.buildUserResponse(newUser)
  }

  @ApiBody({ type: [LoginUserDto] })
  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const dbUser = await this.userService.login(loginUserDto)
    return this.userService.buildUserResponse(dbUser)
  }

  @Get('user')
  //Для защиты маршрута от неаутентифицированных пользователей
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @User() user: UserEntity,
    // @User('id') userId: number,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user)
  }

  @ApiBody({ type: [UpdateUserDto] })
  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    )
    return this.userService.buildUserResponse(updatedUser)
  }

  @ApiExcludeEndpoint()
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @ApiExcludeEndpoint()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }

  @Get('user/test-mail-sending')
  async testMailSending() {
    await this.appMailerService.sendMail()
  }

  @Post('user/forgot_password')
  @UsePipes(new ValidationPipe())
  async forgotPassword(
    @Body('user') forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    await this.userService.forgotPassword(forgotPasswordDto)
  }
}
