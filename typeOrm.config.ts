import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Account } from './src/accounts/account.entity';
import { Booking } from './src/bookings/booking.entity';
import { Guest } from './src/guests/guest.entity';
import { Room } from './src/rooms/room.entity';
import { RoomType } from './src/roomType/roomType.entity';
import { loadEntities1665606830506 } from './src/migrations/1665606830506-loadEntities';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('PGHOST'),
  port: configService.get('PGPORT'),
  username: configService.get('PGUSER'),
  password: configService.get('PGPASSWORD'),
  database: configService.get('PGDATABASE'),
  entities: [Account, Booking, Guest, Room, RoomType],
  migrations: [loadEntities1665606830506],
});
