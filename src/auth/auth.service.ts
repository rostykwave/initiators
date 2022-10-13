import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(email: string, password: string) {
    const account = await this.accountsService.getAccountByEmail(email);
    if (account) {
      const passwordEquals = await bcrypt.compare(password, account.password);
      if (account && passwordEquals) {
        const { password, ...rest } = account;
        return rest;
      }
    }
    return null;
  }

  async login(account: Account) {
    return this.generateToken(account);
  }

  async registration(account: Account) {
    const candidate = await this.accountsService.getAccountByEmail(
      account.email,
    );

    if (candidate) {
      throw new HttpException(
        'Account already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(account.password, 5);
    const accountSafe = await this.accountsService.create({
      ...account,
      password: hashPassword,
    });
    return this.generateToken(accountSafe);
  }

  private async generateToken(account: Account) {
    const payload = {
      id: account.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
