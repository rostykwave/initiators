import { Room } from '../room.entity';

export class FindAllByOfficeIdDto {
  data: {
    rooms: Room[];
  };
}
