import { Room } from './room.entity';

export interface IRoomRepository {
  findAllRooms(officeId: number, soonestBookingsDays: number): Promise<Room[]>;
}
