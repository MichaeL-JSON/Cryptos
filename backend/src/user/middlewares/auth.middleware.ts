import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    console.log('AuthMiddleware: ', req.headers)
    if (!req.headers.authorization) {
      req.user = null
      next()
      //Предотвращение выполнения последующего кода при отстутствии JWT-token
      return
    }
    next()
  }
}
