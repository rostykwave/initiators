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
export class OneTimeBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  meetingDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @ManyToOne(() => Account, (account) => account.oneTimeBookings)
  owner: Account;

  @ManyToOne(() => Room, (room) => room.oneTimeBookings)
  room: Room;

  @OneToMany(() => Guest, (guest) => guest.oneTimeBooking)
  guests: Guest[];
}
