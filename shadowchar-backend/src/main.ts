import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // PIPE VALIDATION GLOBAL
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Shadowchar API')
    .setDescription(
      'A API para o gerenciador de fichas de Shadow of the demon lord',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // Cookie Parser
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
