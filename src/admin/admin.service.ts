import { Injectable } from '@nestjs/common';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AdminService {
  constructor(private readonly accountsService: AccountsService) {}

  async createBasicAccounts(emails: string[]): Promise<Account> {
    return await this.accountsService.createBasicAccounts(emails);
  }
}
