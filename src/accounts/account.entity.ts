import { RecurringBooking } from '../recurringBookings/recurringBooking.entity';
import { Guest } from '../guests/guest.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OneTimeBooking } from 'src/oneTimeBookings/oneTimeBooking.entity';

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

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

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
