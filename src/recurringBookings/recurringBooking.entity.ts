import { Account } from '../accounts/account.entity';
import { Guest } from '../guests/guest.entity';
import { Room } from '../rooms/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum DaysOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

@Entity()
export class RecurringBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: DaysOfWeek,
    array: true,
    nullable: true,
  })
  daysOfWeek: DaysOfWeek[];

  @ManyToOne(() => Account, (account) => account.recurringBookings)
  owner: Account;

  @ManyToOne(() => Room, (room) => room.recurringBookings)
  room: Room;

  @OneToMany(() => Guest, (guest) => guest.recurringBooking)
  guests: Guest[];
}
