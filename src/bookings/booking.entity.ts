import { Account } from 'src/accounts/account.entity';
import { Guest } from 'src/guests/guest.entity';
import { Room } from 'src/rooms/room.entity';
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

  @Column({ type: 'timestamptz' })
  meetingDate: Date;

  @Column({
    type: 'enum',
    enum: DaysOfWeek,
    nullable: true,
  })
  daysOfWeek: DaysOfWeek;

  @ManyToOne(() => Account, (account) => account.id)
  account: Account;

  @ManyToOne(() => Room, (room) => room.id)
  room: Room;

  @OneToMany(() => Guest, (guest) => guest.id)
  guest: Guest[];
}
