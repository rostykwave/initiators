import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { DataSource } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { BookingsModule } from './bookings/bookings.module';
import { GuestsModule } from './guests/guests.module';
import { RoomTypesModule } from './roomType/roomTypes.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    AccountsModule,
    BookingsModule,
    GuestsModule,
    RoomsModule,
    RoomTypesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
