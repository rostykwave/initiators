import { RecurringBooking } from '../recurring-bookings/recurring-booking.entity';
import { Guest } from '../guests/guest.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OneTimeBooking } from 'src/one-time-bookings/one-time-booking.entity';

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  approved: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => OneTimeBooking, (oneTimeBooking) => oneTimeBooking.owner)
  oneTimeBookings: OneTimeBooking[];

  @OneToMany(
    () => RecurringBooking,
    (recurringBooking) => recurringBooking.owner,
  )
  recurringBookings: RecurringBooking[];

  @OneToMany(() => Guest, (guest) => guest.owner)
  guests: Guest[];
}
