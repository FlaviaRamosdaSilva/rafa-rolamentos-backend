import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro para propriedades desconhecidas
      transform: true, // Transforma dados para os tipos definidos no DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
