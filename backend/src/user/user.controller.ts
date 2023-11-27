import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'
import { ResponseUserListDto } from '@app/user/dto/response-userList.dto'

@ApiTags('Users')
@ApiExtraModels(CreateUserDto, LoginUserDto, UpdateUserDto, ForgotPasswordDto)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly appMailerService: AppMailerService,
  ) {}

  @Redirect()
  @Get('user/activate')
  async activate(
    @Query('id') userId: number,
    @Query('token') token: string,
  ): Promise<{ url: string }> {
    return { url: await this.userService.activate(userId, token) }
  }

  @Get('users/all')
  async findAll(): Promise<ResponseUserListDto> {
    return { users: await this.userService.findAll() }
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

  /*  @ApiBody({ type: ChangePasswordDto })
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
  }*/
}
