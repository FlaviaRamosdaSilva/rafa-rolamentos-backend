import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro para propriedades desconhecidas
      transform: true, // Transforma dados para os tipos definidos no DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Rafa Rolamentos')
    .setDescription('Sistema de estoque para uma loja de rolamentos')
    .setVersion('1.0')
    .addTag('Rolamentos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
