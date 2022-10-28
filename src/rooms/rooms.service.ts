import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async findAllRooms(
    officeId: number,
    soonestBookingsDays: number,
  ): Promise<Room[]> {
    return await this.roomRepository.findAllRooms(
      officeId,
      soonestBookingsDays,
    );
  }
}
