import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(email: string, password: string): Promise<any> {
    const account = await this.accountsService.getAccountByEmail(email);
    if (account) {
      const passwordEquals = await bcrypt.compare(password, account.password);
      if (passwordEquals) {
        const { password, ...rest } = account;
        return rest;
      }
    }
    return null;
  }

  async login(account: CreateAccountDto): Promise<string> {
    return this.generateToken(account);
  }

  // Rework signUp
  async register(account: CreateAccountDto): Promise<string> {
    const candidate = await this.accountsService.getAccountByEmail(
      account.email,
    );

    // console.log(candidate);

    if (candidate && candidate.approved) {
      throw new HttpException(
        'Account already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (candidate) {
      const hashPassword = await bcrypt.hash(account.password, 5);
      const accountSafe = await this.accountsService.approve(
        account,
        hashPassword,
      );
      return this.generateToken(accountSafe);
    }
    throw new BadRequestException();
  }

  // async register(account: CreateAccountDto): Promise<any> {
  //   const candidate = await this.accountsService.getAccountByEmail(
  //     account.email,
  //   );

  //   if (candidate) {
  //     throw new HttpException(
  //       'Account already exists!',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const hashPassword = await bcrypt.hash(account.password, 5);
  //   const accountSafe = await this.accountsService.create({
  //     ...account,
  //     password: hashPassword,
  //   });
  //   return this.generateToken(accountSafe);
  // }

  private async generateToken(account: CreateAccountDto): Promise<any> {
    const payload = {
      id: account.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
