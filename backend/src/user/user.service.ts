import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { UserEntity } from '@app/user/entities/user.entity'
import { USER_REPOSITORY } from '@app/constants/constants'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/configs/JWT.config'
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import * as bcrypt from 'bcrypt'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'
import { ConfigService } from '@nestjs/config'
import { ChangePasswordDto } from '@app/user/dto/change-password.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    private readonly appMailerService: AppMailerService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.findOneByEmail(createUserDto.email)

    const userByUserName = await this.findOneByUserName(createUserDto.username)

    if (userByEmail || userByUserName) {
      throw new HttpException(
        'Email address or username is already taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    const newUser = this.userRepository.create(createUserDto)
    if (newUser) {
      await this.appMailerService.sendMail(
        `You were registered under the name ${newUser.username} on the site Cryptos!`,
        newUser,
      )
    }
    return await this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const dbUser: UserEntity = await this.userRepository.findOne({
      select: ['id', 'username', 'email', 'password', 'avatar'],
      where: {
        email: loginUserDto.email,
      },
    })

    if (
      !dbUser ||
      !(await bcrypt.compare(loginUserDto.password, dbUser.password))
    ) {
      throw new UnauthorizedException()
    }

    //Удаляем свойство password из объекта, содержащего данные пользователя
    delete dbUser.password
    return dbUser
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId)
    Object.assign(user, updateUserDto)
    const updatedUser = await this.userRepository.save(user)
    delete updatedUser.password
    return updatedUser
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  generateJwt(user: UserEntity): string {
    return sign({ ...user }, JWT_SECRET)
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return { user: { ...user, token: this.generateJwt(user) } }
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    })
  }

  async findOneByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { username },
    })
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.findOneByEmail(forgotPasswordDto.email)
    if (!user) {
      throw new HttpException(
        'A user with this email address is not registered',
        HttpStatus.NOT_FOUND,
      )
    }

    const token = this.generateJwt(user)

    await this.setForgotPasswordToken(user.id, token)

    const forgotLink = `http://${this.configService.get(
      'API_HOST',
    )}:${this.configService.get('API_PORT')}/${this.configService.get(
      'API_PREFIX',
    )}/user/forgot_password?token=${token}`

    const html = `<p>Please, use this  <a href='${forgotLink}'>link</a> to reset your password!</p>`

    await this.appMailerService.sendMail(html, user)
  }

  async setForgotPasswordToken(
    userId: number,
    forgotPasswordToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, { forgotPasswordToken })
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserEntity> {
    const dbUser = await this.findOneById(userId)
    if (!dbUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const hashPassword = await bcrypt.hash(changePasswordDto.password, 10)

    await this.userRepository.update(userId, {
      password: hashPassword,
    })

    return dbUser
  }
}
