import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('registration')
  register(@Body() account: CreateAccountDto): Promise<any> {
    return this.authService.register(account);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user); // return JWT access token
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
