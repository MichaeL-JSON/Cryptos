import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiExcludeController } from '@nestjs/swagger'

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('test-mail-sending')
  async sendMail(): Promise<void> {
    await this.appService.sendMail()
  }
}
