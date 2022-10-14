import { Account } from '../accounts/account.entity';
import { RecurringBooking } from '../recurringBookings/recurringBooking.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OneTimeBooking } from 'src/oneTimeBookings/oneTimeBooking.entity';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.guests)
  guest: Account;

  @ManyToOne(() => Account, (account) => account.guests)
  owner: Account;

  @ManyToOne(() => OneTimeBooking, (oneTimeBooking) => oneTimeBooking.guests)
  oneTimeBooking: OneTimeBooking;

  @ManyToOne(
    () => RecurringBooking,
    (recurringBooking) => recurringBooking.guests,
  )
  recurringBooking: RecurringBooking;
}
