import { Module } from '@nestjs/common'
import { UserModule } from '@app/user/user.module'
import { AuthService } from '@app/auth/auth.service'
import { AuthController } from '@app/auth/auth.controller'
import { TokenModule } from '@app/token/token.module'
import { AppMailerModule } from '@app/app-mailer/app-mailer.module'

@Module({
  controllers: [AuthController],
  imports: [UserModule, TokenModule, AppMailerModule],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
