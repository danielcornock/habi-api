import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import * as env from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://habi-uk.netlify.app']
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (!env.isProduction) {
    app.use(morgan('dev'));
  }

  await app.listen(env.port);
  Logger.log(`Server listening on port ${env.port}`, 'NestApplication');
}

bootstrap();
