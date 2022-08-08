import { IsEmail, IsString } from 'class-validator';

export class SendEmailToQueueDto {
  @IsEmail()
  emailAddress: string;

  @IsString()
  content: string;
}
