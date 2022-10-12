import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { BookingsModule } from './bookings/bookings.module';
import { GuestsModule } from './guests/guests.module';
import { RoomTypesModule } from './roomType/roomTypes.module';
import { RoomsModule } from './rooms/rooms.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('PGHOST'),
      port: configService.get<number>('PGPORT'),
      username: configService.get<string>('PGUSER'),
      password: configService.get<string>('PGPASSWORD'),
      database: configService.get<string>('PGDATABASE'),
      autoLoadEntities: true,
      synchronize: true,
      // synchronize: false,
      // migrations: ['dist/src/migrations/*.js'],
      // migrationsTableName: 'migrations',
    }),
    AccountsModule,
    BookingsModule,
    GuestsModule,
    RoomsModule,
    RoomTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
