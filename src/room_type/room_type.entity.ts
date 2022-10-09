import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room_Type {
  @PrimaryGeneratedColumn()
  Type_ID: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
