import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('registration')
  register(@Body() account: CreateAccountDto): Promise<string> {
    return this.authService.register(account);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<string> {
    return this.authService.login(req.user); // return JWT access token
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<Account> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(changePasswordDto);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }
}
