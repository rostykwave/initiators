import { Room } from '../room.entity';

export interface IRoomsRepository {
  findOneById(id: number): Promise<Room>;

  findAllRooms(officeId: number, soonestBookingsDays: number): Promise<Room[]>;
}
