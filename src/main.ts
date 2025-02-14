import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Lista de origens permitidas
      const allowedOrigins = [
        'https://rafa-rolamentos.vercel.app',
        'http://localhost:3000',
      ];

      // Se não houver origem (por exemplo, em requisições sem origem) ou se a origem estiver na lista, permite
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // se você estiver usando cookies ou outras credenciais
  });

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
    .addBearerAuth() // Se você usa autenticação JWT
    .addServer('/') // Adiciona o servidor base
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Obtenha a instância do PrismaService injetada pelo NestJS
  const prismaService = app.get(PrismaService);

  try {
    await prismaService.$connect(); // Conecte-se ao banco de dados
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
