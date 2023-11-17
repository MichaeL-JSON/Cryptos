import { Module } from '@nestjs/common'
import { UserModule } from '@app/user/user.module'
import { AuthService } from '@app/auth/auth.service'
import { AuthController } from '@app/auth/auth.controller'

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
