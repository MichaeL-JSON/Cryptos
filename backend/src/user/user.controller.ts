import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'
import { User } from '@app/user/decorators/user.decorator'
import { UserEntity } from '@app/user/entities/user.entity'
import { AuthGuard } from "@app/user/guards/auth.guard";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const newUser = await this.userService.create(createUserDto)
    return this.userService.buildUserResponse(newUser)
  }

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
    @User('id') userId: number,
  ): Promise<UserResponseInterface> {
    console.log(userId)
    return this.userService.buildUserResponse(user)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
