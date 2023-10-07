import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/configs/JWT.config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    console.log('AuthMiddleware: ', req.headers)
    //Проверка наличия токена авторизации в заголовке запроса пользователя
    if (!req.headers.authorization) {
      req.user = null
      next()
      //Предотвращение выполнения последующего кода при отсутствии JWT-token.
      return
    }

    //Получение токена авторизации из заголовков запроса пользователя
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)

    //Декодирование JWT токена авторизации
    try {
      const decode = verify(token, JWT_SECRET)
      console.log('decode: ', decode)
      next()
    } catch (e) {
      //При выбросе исключения "обнуляем" пользователя
      req.user = null
      next()
    }
  }
}
