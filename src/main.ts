import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appConfig } from './configs/configs.contants'
import { ValidationPipe } from '@nestjs/common'
import { TrimPipe } from '@share/pipe/trim-text.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  
  app.setGlobalPrefix(appConfig.apiPrefix)

  // Use PipeTransform
  app.useGlobalPipes(new TrimPipe())

  // Use validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  await app.listen(appConfig.port)
}
bootstrap()
