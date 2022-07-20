import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('email')
@UseGuards(AuthGuard('jwt'))
export class EmailController {
  @Get('test')
  async authenticatedRoute() {
    return 'Access successful';
  }
}
