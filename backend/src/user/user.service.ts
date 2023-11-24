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
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import * as bcrypt from 'bcrypt'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { ForgotPasswordDto } from '@app/user/dto/forgot-password.dto'
import { ConfigService } from '@nestjs/config'
import { ChangePasswordDto } from '@app/user/dto/change-password.dto'
import { TokenService } from '@app/token/token.service'
import { TokenEntity } from '@app/token/entities/token.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    private readonly appMailerService: AppMailerService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    tokens: TokenEntity,
  ): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto)
    newUser.token = tokens
    return await this.saveUser(newUser)
  }

  async saveUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(newUser)
  }

  async activate(userId: number, activationToken: string): Promise<string> {
    const dbUser: UserEntity = await this.findOneById(userId)
    console.log(dbUser)
    if (activationToken === dbUser.token.activationToken) {
      dbUser.active = true
      dbUser.token.activationToken = ''
      await this.userRepository.save(dbUser)

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

  findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        token: true,
      },
    })
  }

  async findOneByEmail(
    email: string,
    selectedFields: string[] = [],
  ): Promise<UserEntity> {
    const selectOption = {}
    if (selectedFields.length) {
      selectOption['select'] = selectedFields
    }

    if (selectedFields.includes('token')) {
      selectOption['relations'] = {
        token: true,
      }
    }

    const options = { where: { email }, ...selectOption }

    return await this.userRepository.findOne(options)
  }

  async findOneByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { username },
    })
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const dbUser = await this.findOneByEmail(forgotPasswordDto.email)
    if (!dbUser) {
      throw new HttpException(
        'A user with this email address is not registered',
        HttpStatus.NOT_FOUND,
      )
    }

    const activationToken = await bcrypt.hash(dbUser.email, 10)
    dbUser.token.activationToken = activationToken

    await this.userRepository.save(dbUser)

    const resetPasswordLink = `http://${this.configService.get(
      'API_HOST',
    )}:3000/user/reset-password?token=${activationToken}`

    const htmlMessage = `<p>Please, use this link to <a href='${resetPasswordLink}'>reset your password!</a></p>`

    await this.appMailerService.sendMail(htmlMessage, dbUser)
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserEntity> {
    const updatableUser = await this.findOneById(userId)
    if (!updatableUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    updatableUser.password = await bcrypt.hash(changePasswordDto.password, 10)
    updatableUser.token.activationToken = ''

    return await this.userRepository.save(updatableUser)
  }

  async existsUser(createUserDto: CreateUserDto): Promise<boolean> {
    const userByEmail = await this.findOneByEmail(createUserDto.email)

    const userByUserName = await this.findOneByUserName(createUserDto.username)

    return Boolean(userByEmail || userByUserName)
  }
}
