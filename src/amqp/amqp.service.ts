import { Injectable } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AmqpServiceInterface } from './interfaces/amqp-service.interface';

@Injectable()
export class AmqpService implements AmqpServiceInterface {
  private emailClient: ClientProxy;

  private createClientConfig(params: {
    urls: string[];
    queue: string;
  }): ClientOptions {
    return {
      transport: Transport.RMQ,
      options: {
        ...params,
        noAck: false,
      },
    };
  }

  createEmailClient(): ClientProxy {
    if (!this.emailClient) {
      const rmClientConfig: ClientOptions = this.createClientConfig({
        queue: process.env.EMAIL_QUEUE,
        urls: [`amqp://${process.env.RABBITMQ_HOST}`],
      });
      this.emailClient = ClientProxyFactory.create(rmClientConfig);
    }

    return this.emailClient;
  }
}
