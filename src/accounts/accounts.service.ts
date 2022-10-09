import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(Account_ID: number): Promise<Account> {
    return this.accountRepository.findOneBy({ Account_ID });
  }

  async remove(Account_ID: number): Promise<void> {
    await this.accountRepository.delete(Account_ID);
  }
}
