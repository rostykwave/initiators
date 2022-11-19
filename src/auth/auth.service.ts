import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Account } from 'src/accounts/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { ServiceException } from 'src/bookings/exceptions/service.exception';
import { EmailService } from 'src/email/email.service';
import { generator } from 'ts-password-generator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const candidate = await this.checkAccount(changePasswordDto);
    const hashPassword = await bcrypt.hash(changePasswordDto.newPassword, 5);
    candidate.password = hashPassword;
    // should save updated account
    await this.accountsService.saveAccount(candidate);
    return await this.generateToken(candidate);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const candidate = await this.accountsService.getAccountByEmail(
      resetPasswordDto.email,
    );
    if (!candidate) {
      throw new ServiceException(
        `Account with email ${resetPasswordDto.email} not found`,
        404,
      );
    }
    const password: string = generator({
      charsQty: 6,
      haveNumbers: true,
      haveString: false,
    });
    console.log('Password', password);

    // const hashPassword = await bcrypt.hash(changePasswordDto.newPassword, 5);
    // candidate.password = hashPassword;
    // // should save updated account
    // await this.accountsService.saveAccount(candidate);

    // send password via email
    await this.emailService.sendResetPasswordEmail(
      resetPasswordDto.email,
      password,
    );
    // return await this.generateToken(candidate);
  }

  private async generateToken(account: CreateAccountDto): Promise<any> {
    const payload = {
      id: account.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async checkAccount(
    changePasswordDto: ChangePasswordDto,
  ): Promise<Account> {
    const account = await this.accountsService.getAccountByEmail(
      changePasswordDto.email,
    );
    if (account) {
      const passwordEquals = await bcrypt.compare(
        changePasswordDto.oldPassword,
        account.password,
      );
      if (passwordEquals) {
        return account;
      }
    }
    throw new ServiceException('Email or old password incorrect', 401);
  }
}
