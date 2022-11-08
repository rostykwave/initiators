import {
  Body,
  Controller,
  Delete,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Account, Role } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.USER)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe)
  //   id: number,
  //   @Body() createAccountDto: CreateAccountDto,
  // ) {
  //   return this.accountsService.updateOne(id, updateBDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}
