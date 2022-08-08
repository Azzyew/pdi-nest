import { Inject, Injectable } from '@nestjs/common';
import { AmqpService } from 'src/amqp/amqp.service';
import { SendEmailToQueueDto } from './dtos/send-email-to-queue.dto';

@Injectable()
export class EmailService {
  constructor(
    @Inject(AmqpService)
    private readonly amqpService: AmqpService,
  ) {}

  sendEmailToQueue(sendDto: SendEmailToQueueDto) {
    this.amqpService.createEmailClient().emit(process.env.EMAIL_QUEUE, sendDto);
  }
}
