import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'
import { UserService } from '@app/user/user.service'
import { TokenService } from '@app/token/token.service'
import * as process from 'process'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    //Проверка наличия токена авторизации в заголовке запроса пользователя
    if (!req.headers.authorization) {
      req.user = null
      next()
      //Предотвращение выполнения последующего кода при отсутствии JWT-token.
      //Также можно выбросить ошибку авторизации
      // throw new UnauthorizedException('Authorization header not received')
      return
    }

    //Получение (Bearer-token) access-токена авторизации из заголовков запроса пользователя
    const token = req.headers.authorization.split(' ')[1]

    //Можно выбросить ошибку при неполучении Bearer-токена

    //Декодирование JWT access-токена авторизации (Bearer-token)
    try {
      // const decode = verify(token, process.env.JWT_ACCESS_SECRET) as UserType
      const decode = this.tokenService.validateToken(
        token,
        process.env.JWT_ACCESS_SECRET,
      )
      req.user = await this.userService.findOneById(decode.id)
      next()
    } catch (e) {
      //При выбросе исключения "обнуляем" пользователя
      req.user = null
      next()
    }
  }
}
