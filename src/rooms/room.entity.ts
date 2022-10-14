import { Booking } from '../bookings/booking.entity';
import { Office } from '../office/office.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column()
  description: string;

  @Column()
  maxPeople: number;

  @Column()
  minPeople: number;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @ManyToOne(() => Office, (office) => office.rooms)
  office: Office;
}
