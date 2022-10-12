import { Account } from 'src/accounts/account.entity';
import { Booking } from 'src/bookings/booking.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.id)
  Owner_ID: Account;

  @ManyToOne(() => Booking, (booking) => booking.id)
  Booking_ID: Booking;
}
