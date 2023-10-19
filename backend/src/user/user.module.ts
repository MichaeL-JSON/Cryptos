import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { userProviders } from '@app/user/user.providers'
import { DatabaseModule } from '@app/database/database.module'
import { AuthGuard } from '@app/user/guards/auth.guard'
import { AppMailerModule } from '@app/app-mailer/app-mailer.module'

@Module({
  imports: [DatabaseModule, AppMailerModule],
  providers: [UserService, AuthGuard, ...userProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
