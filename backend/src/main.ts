import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'

if (!process.env.IS_TS_NODE) {
  require('module-alias/register.js')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(5000)
}

bootstrap()
