import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { ExpressRequestInterface } from '@app/types/expressRequest.interface'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Выполнена типизация метода getRequest
    const request = context.switchToHttp().getRequest<ExpressRequestInterface>()

    if (!request.user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
    return true
  }
}
