import { Account } from 'src/accounts/account.entity';
import { Booking } from 'src/bookings/bookings.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  Guest_ID: number;

  @ManyToOne(() => Account, (account) => account.Account_ID)
  Owner_ID: Account;

  @ManyToOne(() => Booking, (booking) => booking.Booking_ID)
  Booking_ID: Booking;
}
