import { IsNotEmpty, Matches } from 'class-validator';
import { validPasswordMessage } from 'src/helpers/message.helper';
import { regexPassword } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(regexPassword, {
    message: validPasswordMessage,
  })
  password: string;
}
