import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls:[process.env.RABBITMQ_URL],
      queue: 'mailing_queue',
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  })
  await app.listen();
}

bootstrap();
