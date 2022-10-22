import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Account, Role } from 'src/accounts/account.entity';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('invitation')
  @Roles(Role.ADMIN)
  create(@Body() emails: string[]): Promise<Account> {
    return this.adminService.createBasicAccounts(emails);
  }
}
