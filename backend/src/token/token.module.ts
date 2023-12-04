import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { tokenProviders } from '@app/token/token.providers'
import { DatabaseModule } from '@app/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [TokenService, ...tokenProviders],
  exports: [TokenService],
})
export class TokenModule {}
