import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { TokenService } from '@app/token/token.service'
import { CreateUserDto } from '@app/user/dto/create-user.dto'
import { UserService } from '@app/user/user.service'
import { ResponseUserDataDto } from '@app/user/dto/response-user- data.dto'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'
import { LoginUserDto } from '@app/user/dto/login-user.dto'
import { UserEntity } from '@app/user/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { IToken } from '@app/common/interfaces/itoken.interface'
import { TokenEntity } from '@app/token/entities/token.entity'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { SequreCreateUserDto } from '@app/user/dto/sequre-create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly appMailerService: AppMailerService,
  ) {}

  async registrateUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseUserDataDto> {
    if (await this.userService.existsUser(createUserDto)) {
      throw new HttpException(
        'Email address or username is already taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    /*  Преобразование экземпляра класса CreateUserDto в экземпляр класса
    SequreCreateUserDto с помощью декоратора @Exclude({ toPlainOnly: true })
    свойства password в  CreateUserDto для исключения передачи конфиденциальных данных в JWT-токен*/
    const plainCreateUserDto = instanceToPlain(createUserDto)
    delete plainCreateUserDto.password
    const sequreCreateUserDto: SequreCreateUserDto = plainToInstance(
      SequreCreateUserDto,
      plainCreateUserDto,
    )
    console.log('sequreCreateUserDto: ', sequreCreateUserDto)
    const generatedToken: IToken =
      await this.tokenService.generateTokens(sequreCreateUserDto)

    const createdToken: TokenEntity =
      await this.tokenService.createTokens(generatedToken)

    const newUser = await this.userService.create(createUserDto, createdToken)

    if (newUser) {
      console.log('newUser: ', newUser)
      delete newUser?.password

      this.appMailerService.sendActivationMail(newUser)

      return {
        ...generatedToken,
        user: newUser,
      }
    }
  }

  async activateUser(userId: number, activationToken: string): Promise<string> {
    return await this.userService.activate(userId, activationToken)
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const dbUser: UserEntity = await this.userService.findOneByEmail(
      loginUserDto.email,
      ['id', 'username', 'email', 'password', 'avatar'],
    )
    console.log(dbUser)
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

  // eslint-disable-next-line prettier/prettier
  async logoutUser() {}

  // eslint-disable-next-line
  async refreshAccessToken() {}

  async getUsers() {}

  /*  buildAuthResponse(user: UserEntity): UserResponseInterface {
      return { user: { ...user, token: this.tokenService.generateJwt(user) } }
    }*/
}
