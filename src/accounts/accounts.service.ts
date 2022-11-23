import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { generator } from 'ts-password-generator';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { EmailService } from '../email/email.service';
import { ServiceException } from 'src/bookings/exceptions/service.exception';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly emailService: EmailService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.firstName = createAccountDto.firstName;
    account.lastName = createAccountDto.lastName;
    account.email = createAccountDto.email;
    account.password = createAccountDto.password;

    return this.accountRepository.save(account);
  }

  async createBasicAccounts(emails: string[]): Promise<any> {
    // Make sure emails are unique
    const uniqueEmails = [...new Set(emails)];

    const basicAccounts = [];

    for (let i = 0; i < uniqueEmails.length; i += 1) {
      const basicAccount = await this.createBasicAccount(uniqueEmails[i]);
      if (basicAccount) {
        const { firstName, lastName, password, ...rest } = basicAccount;
        basicAccounts.push(rest);
      }
    }

    return basicAccounts;
  }

  async createBasicAccount(email: string): Promise<Account> {
    const candidate = await this.getAccountByEmail(email);
    if (!candidate) {
      const accountBasic = new Account();
      const password: string = generator({ haveNumbers: true });
      accountBasic.email = email;
      accountBasic.password = await bcrypt.hash(password, 5);
      await this.emailService.sendInvitationEmail(email, password);
      return await this.accountRepository.save(accountBasic);
    }
    if (candidate && !candidate.approved) {
      const newPassword: string = generator({ haveNumbers: true });
      candidate.password = await bcrypt.hash(newPassword, 5);
      await this.emailService.sendInvitationEmail(email, newPassword);
      return await this.accountRepository.save(candidate);
    }
    throw new ServiceException(
      `Account with email ${email} already registered`,
      400,
    );
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

  async approve(
    createAccountDto: CreateAccountDto,
    hashPassword: string,
  ): Promise<Account> {
    const account = await this.getAccountByEmail(createAccountDto.email);
    account.approved = true;
    account.firstName = createAccountDto.firstName;
    account.lastName = createAccountDto.lastName;
    account.password = hashPassword;
    return this.accountRepository.save(account);
  }

  async saveAccount(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }
}
