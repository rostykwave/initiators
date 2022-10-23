import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
