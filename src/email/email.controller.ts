import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendEmailToQueueDto } from './dtos/send-email-to-queue.dto';
import { EmailService } from './email.service';

@Controller('email')
@UseGuards(AuthGuard('jwt'))
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('test')
  async authenticatedRoute() {
    return 'Access successful';
  }

  @Post('send')
  sendEmailToQueue(@Query() query: SendEmailToQueueDto) {
    return this.emailService.sendEmailToQueue(query);
  }
}
