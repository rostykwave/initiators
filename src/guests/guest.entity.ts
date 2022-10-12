import { Account } from 'src/accounts/account.entity';
import { Booking } from 'src/bookings/booking.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.id)
  owner: Account;

  @ManyToOne(() => Booking, (booking) => booking.id)
  booking: Booking;
}
