import { Room_Type } from 'src/room_type/room_type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  Room_ID: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maxPeople: number;

  @Column()
  minPeople: number;

  @OneToOne(() => Room_Type, (room_type) => room_type.Type_ID)
  @JoinColumn()
  Type_ID: Room_Type;
}
