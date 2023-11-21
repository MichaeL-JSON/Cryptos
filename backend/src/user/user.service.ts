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
import { UserResponseInterface } from '@app/user/types/userResponse.interface'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import * as bcrypt from 'bcrypt'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'
import { ConfigService } from '@nestjs/config'
import { ChangePasswordDto } from '@app/user/dto/change-password.dto'
import { TokenService } from '@app/token/token.service'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    private readonly appMailerService: AppMailerService,
    private readonly tokenService: TokenService,
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

    //Генерация токена для ссылки на подтверждение создания учётной записи
    newUser.activationToken = await bcrypt.hash(newUser.email, 10)

    return await this.saveUser(newUser)
  }

  async saveUser(newUser: UserEntity) {
    return await this.userRepository.save(newUser)
  }

  async activate(userId: number, activationToken: string): Promise<string> {
    const user = await this.findOneById(userId)
    if (activationToken === user.activationToken) {
      await this.userRepository.update(userId, {
        active: true,
        activationToken: '',
      })

      return `http://${this.configService.get(
        'CLIENT_HOST',
      )}:${this.configService.get('CLIENT_PORT')}/login`
    }
    throw new HttpException('Token is not valid', HttpStatus.NOT_ACCEPTABLE)
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

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return { user: { ...user, token: this.tokenService.generateJwt(user) } }
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  async findOneByEmail(
    email: string,
    select: string[] = [],
    getRefreshToken: boolean = false,
  ): Promise<UserEntity> {
    const selectOption = {}
    if (select.length) {
      selectOption['select'] = select
    }
    if (getRefreshToken) {
      selectOption['tokens'] = select
    }
    const options = { where: { email }, ...selectOption }
    console.log(options)
    return await this.userRepository.findOne(options)
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

    const activationToken = await bcrypt.hash(user.password, 10)

    await this.setToken(user.id, activationToken)

    const resetPasswordLink = `http://${this.configService.get(
      'API_HOST',
    )}:3000/user/reset-password?token=${activationToken}`

    const htmlMessage = `<p>Please, use this link to <a href="${resetPasswordLink}">reset your password!</a></p>`

    await this.appMailerService.sendMail(htmlMessage, user)
  }

  async setToken(userId: number, activationToken: string): Promise<void> {
    await this.userRepository.update(userId, { activationToken })
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
      activationToken: '',
    })

    return dbUser
  }
}
