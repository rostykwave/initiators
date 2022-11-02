import { Account } from '../accounts/account.entity';
import { Guest } from '../guests/guest.entity';
import { Room } from '../rooms/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

export enum DaysOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

@Entity()
export class RecurringBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
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
