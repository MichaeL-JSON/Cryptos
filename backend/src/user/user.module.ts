import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { userProviders } from '@app/user/user.providers'
import { DatabaseModule } from '@app/database/database.module'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { AppMailerModule } from '@app/app-mailer/app-mailer.module'
import { TokenModule } from '@app/token/token.module'

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [DatabaseModule, AppMailerModule, TokenModule],
  providers: [UserService, AuthGuard, ...userProviders],
})
export class UserModule {}
