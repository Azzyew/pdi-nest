import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOne(id);
    } catch (err) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user) {
    const payload = { sub: user.id, name: user.name };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
