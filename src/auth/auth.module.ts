import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/email/email.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get<string>('SECRET'),
      signOptions: { expiresIn: '5h' },
    }),
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
