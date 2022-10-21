import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

@Injectable()
export class AdminService {
  constructor(private readonly accountsService: AccountsService) {}

  async createBasicAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    //TODO send a message via email

    const candidate = await this.accountsService.getAccountByEmail(
      createAccountDto.email,
    );

    if (candidate) {
      throw new HttpException(
        'Account already invited!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.accountsService.createBasicAccount(createAccountDto);
  }
}
