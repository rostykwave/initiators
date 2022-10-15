import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.firstName = createAccountDto.firstName;
    account.lastName = createAccountDto.lastName;
    account.email = createAccountDto.email;
    account.password = createAccountDto.password;

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    return this.accountRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.accountRepository.delete(id);
  }

  async getAccountByEmail(email: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { email } });
    return account;
  }
}
