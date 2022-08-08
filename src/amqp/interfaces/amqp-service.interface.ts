import { ClientProxy } from '@nestjs/microservices';

export interface AmqpServiceInterface {
  createEmailClient(): ClientProxy;
}
