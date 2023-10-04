import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { userProviders } from '@app/user/user.providers'
import { DatabaseModule } from '@app/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
