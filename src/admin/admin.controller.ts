import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Account, Role } from 'src/accounts/account.entity';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('invitation')
  async create(@Body() emails: string[]): Promise<Account> {
    try {
      return await this.adminService.createBasicAccounts(emails);
    } catch (error) {
      if (error instanceof ServiceException) {
        throw new HttpException(error.message, error.code);
      } else {
        throw error;
      }
    }
  }
}
