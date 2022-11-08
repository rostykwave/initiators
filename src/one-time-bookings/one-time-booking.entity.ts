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

@Entity()
export class OneTimeBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ type: 'date' })
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
