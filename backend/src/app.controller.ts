import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiExcludeController } from '@nestjs/swagger'
import { AppMailerService } from '@app/app-mailer/app-mailer.service'

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appMailerService: AppMailerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('test-mail-sending')
  async sendMail(): Promise<void> {
    await this.appMailerService.sendMail()
  }
}
