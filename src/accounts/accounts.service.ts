import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { generator } from 'ts-password-generator';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
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
    emails.forEach((email) => {
      this.createBasicAccount(email);
    });
  }

  async createBasicAccount(email: string): Promise<any> {
    const candidate = await this.getAccountByEmail(email);
    if (!candidate) {
      const accountBasic = new Account();
      const password: string = generator({ haveNumbers: true });
      accountBasic.email = email;
      accountBasic.password = await bcrypt.hash(password, 5);

      //TODO send a message via email
      const mail = {
        to: email,
        subject: 'Welcome to Incora',
        from: this.configService.get<string>('SEND_GRID_EMAIL'), // Fill it with your validated email on SendGrid account
        text: `We are pleased to invite you to our team. Continue registration with yours email: "${email}" and password: "${password}". Follow link: "https://initiators-ua.herokuapp.com/accounts"`,
        html: `<div><h1>We are pleased to invite you to our team.</h1><p>Continue registration with yours email: "${email}" and password: "${password}".</p>Follow <a href="https://initiators-ua.herokuapp.com/accounts">link to registration</a></div>`,
      };

      await this.mailService.send(mail);
      console.log('Password ', password);

      return this.accountRepository.save(accountBasic);
    }

    console.log(`User with email ${email} already exists`);
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
}
