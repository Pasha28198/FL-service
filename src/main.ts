import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Front Line')
    .setDescription('Front Line application')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  await app.listen(3000);
}
bootstrap();