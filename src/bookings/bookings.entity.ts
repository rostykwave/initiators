import { Account } from 'src/accounts/account.entity';
import { Guest } from 'src/guests/guests.entity';
import { Room } from 'src/rooms/rooms.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum DaysOfWeek {
  Mon = 'Monday',
  Tue = 'Tuesday',
  Wed = 'Wednesday',
  Thu = 'Thursday',
  Fri = 'Friday',
  Sat = 'Saturday',
  Sun = 'Sunday',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  Booking_ID: number;

  @Column({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @Column({ type: 'time', nullable: true })
  startTime: Date;

  @Column({ type: 'time', nullable: true })
  endTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  meetingDate: Date;

  @Column({
    type: 'enum',
    enum: DaysOfWeek,
    default: DaysOfWeek.Mon,
  })
  daysOfWeek: DaysOfWeek;

  @ManyToOne(() => Account, (account) => account.Account_ID)
  Account_ID: Account;

  @OneToMany(() => Guest, (guest) => guest.Guest_ID)
  guest: Guest;

  @ManyToOne(() => Room, (room) => room.Room_ID)
  Room_ID: Room;
}
