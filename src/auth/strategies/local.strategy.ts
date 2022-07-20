import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { invalidLogin } from 'src/helpers/message.helper';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validate(id: string, password: string) {
    const user = await this.authService.validateUser(id, password);

    if (!user) throw new UnauthorizedException(invalidLogin);

    return user;
  }
}
