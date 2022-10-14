import { Account } from '../accounts/account.entity';
import { Booking } from '../bookings/booking.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.guests)
  guest: Account;

  @ManyToOne(() => Account, (account) => account.guests)
  owner: Account;

  @ManyToOne(() => Booking, (booking) => booking.guests)
  booking: Booking;
}
