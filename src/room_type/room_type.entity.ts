import { Room } from 'src/rooms/rooms.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Room_Type {
  @PrimaryGeneratedColumn()
  Type_ID: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Room, (room) => room.Type_ID)
  room: Room;
}
