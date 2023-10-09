import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'process'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

if (!process.env.IS_TS_NODE) {
  require('module-alias/register.js')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Cryptos')
    .setDescription('The Cryptos API description')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Articles')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(5000)
}

bootstrap()
