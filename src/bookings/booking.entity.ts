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
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  meetingDate: Date;

  @Column({
    type: 'enum',
    enum: DaysOfWeek,
    array: true,
    nullable: true,
  })
  daysOfWeek: DaysOfWeek[];

  @ManyToOne(() => Account, (account) => account.bookings)
  owner: Account;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @OneToMany(() => Guest, (guest) => guest.booking)
  guests: Guest[];
}
