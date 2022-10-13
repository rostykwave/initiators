import { Booking } from '../bookings/booking.entity';
import { RoomType } from '../roomType/roomType.entity';
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

  @OneToMany(() => Booking, (booking) => booking.id)
  booking: Booking[];

  @ManyToOne(() => RoomType, (roomType) => roomType.room)
  roomType: RoomType;
}
