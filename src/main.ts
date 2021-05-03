import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ methods: '*', origin: '*' });
  process.env.PORT = '3300';
  await app.listen(process.env.PORT);
}
bootstrap();
