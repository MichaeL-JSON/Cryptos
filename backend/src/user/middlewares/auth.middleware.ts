import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'
import { verify } from 'jsonwebtoken'
import { UserService } from '@app/user/user.service'
import { UserType } from '@app/user/types/user.type'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    //Проверка наличия токена авторизации в заголовке запроса пользователя
    if (!req.headers.authorization) {
      req.user = null
      next()
      //Предотвращение выполнения последующего кода при отсутствии JWT-token.
      return
    }

    //Получение токена авторизации из заголовков запроса пользователя
    const token = req.headers.authorization.split(' ')[1]

    //Декодирование JWT токена авторизации
    try {
      const decode = verify(token, process.env.JWT_ACCESS_SECRET) as UserType
      req.user = await this.userService.findOneById(decode.id)
      next()
    } catch (e) {
      //При выбросе исключения "обнуляем" пользователя
      req.user = null
      next()
    }
  }
}
