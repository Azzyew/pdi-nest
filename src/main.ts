import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBITMQ_HOST}`],
      queue: process.env.QUEUE,
      prefetchCount: Number(process.env.PARALLEL_PROCESSINGS),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
