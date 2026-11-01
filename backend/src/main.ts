import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.useLogger(
    new ConsoleLogger({ json: config.get('NODE_ENV') === 'production' }),
  );

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.enableCors({ origin: config.getOrThrow<string>('CORS_ORIGIN') });
  app.enableShutdownHooks();

  await app.listen(config.getOrThrow<number>('PORT'));
}
void bootstrap();
