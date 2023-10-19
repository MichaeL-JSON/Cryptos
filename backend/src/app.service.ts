import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    return "Hello! It's a Cryptos Project API!"
  }
}
