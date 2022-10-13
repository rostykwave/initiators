import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' }); // config
  }

  async validate(email: string, password: string): Promise<any> {
    const account = await this.authService.validateAccount(email, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
