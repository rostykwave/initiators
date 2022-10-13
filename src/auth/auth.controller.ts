import { Body, Controller, Post } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() account: Account) {
    return this.authService.registration(account);
  }
}
