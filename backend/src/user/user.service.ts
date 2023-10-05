import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
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

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findBy({
      email: createUserDto.email,
    })

    const userByUserName = await this.userRepository.findBy({
      username: createUserDto.username,
    })

    if (userByEmail.length || userByUserName.length) {
      throw new HttpException(
        'Email address or username is already taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    const newUser = this.userRepository.create(createUserDto)
    return await this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const dbUser: UserEntity = await this.userRepository.findOne({
      select: ['id', 'username', 'email', 'password', 'avatar'],
      where: {
        email: loginUserDto.email,
      },
    })

    if (!dbUser) {
      throw new HttpException(
        'There is no user with this email address in the database!',
        HttpStatus.UNAUTHORIZED,
      )
    }

    if (!(await bcrypt.compare(loginUserDto.password, dbUser.password))) {
      throw new HttpException(
        'Incorrect password entered!',
        HttpStatus.UNAUTHORIZED,
      )
    }

    //Удаляем свойство password из объекта, содержащего данные пользователя
    delete dbUser.password
    return dbUser
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    return `This action updates a #${id} user`
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
}
