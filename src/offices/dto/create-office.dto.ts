import { Room } from 'src/rooms/room.entity';

export class CreateOfficeDto {
  id?: number;
  name: string;
  description: string;
  rooms: Room[];
}
