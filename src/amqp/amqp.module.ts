import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AmqpService } from './amqp.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'EMAIL',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST}`],
          queue: process.env.EMAIL_QUEUE,
          noAck: false,
        },
      },
    ]),
  ],
  providers: [AmqpService],
  exports: [AmqpService],
})
export class AmqpModule {}
