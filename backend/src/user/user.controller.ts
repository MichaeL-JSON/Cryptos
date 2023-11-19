import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
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
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'
import { ChangePasswordDto } from '@app/user/dto/change-password.dto'

@ApiTags('Users')
@ApiExtraModels(CreateUserDto, LoginUserDto, UpdateUserDto, ForgotPasswordDto)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
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
  @Post('users')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const newUser = await this.userService.create(createUserDto)
    return this.userService.buildUserResponse(newUser)
  }

  @Redirect()
  @Get('user/activate')
  async activate(
    @Query('id') userId: number,
    @Query('token') token: string,
  ): Promise<{ url: string }> {
    return { url: await this.userService.activate(userId, token) }
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(UpdateUserDto),
        },
      },
    },
  })
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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          $ref: getSchemaPath(ForgotPasswordDto),
        },
      },
    },
  })
  @Post('user/forgot-password')
  @UsePipes(new ValidationPipe())
  async forgotPassword(
    @Body('user') forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    await this.userService.forgotPassword(forgotPasswordDto)
  }

  @ApiBody({ type: ChangePasswordDto })
  @Put('user/change-password')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async changePassword(
    @User() userEntity: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.userService.changePassword(
      userEntity.id,
      changePasswordDto,
    )

    return this.userService.buildUserResponse(updatedUser)
  }
}
