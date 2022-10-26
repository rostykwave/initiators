import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/offices/office.entity';
import { Between, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Office)
    private readonly officeRepository: Repository<Office>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.name = createRoomDto.name;
    room.floor = createRoomDto.floor;
    room.description = createRoomDto.description;
    room.maxPeople = createRoomDto.maxPeople;
    room.minPeople = createRoomDto.minPeople;

    const office = await this.officeRepository.findOneBy({
      name: createRoomDto.officeName,
    });
    room.office = office;

    return await this.roomRepository.save(room);
  }

  async findAllByOfficeId(officeId: number): Promise<Room[]> {
    const dateFrom = '2022-10-27';
    const dateTo = '2022-10-28';

    return await this.roomRepository.find({
      relations: {
        oneTimeBookings: true,
        recurringBookings: true,
      },
      where: {
        office: {
          id: officeId,
        },
        oneTimeBookings: [
          {
            meetingDate: Between(new Date(dateFrom), new Date(dateTo)),
          },
          //{} What else to write to define an empty [] of oneTimeBookings
        ],
        recurringBookings: {
          startDate: Between(new Date(dateFrom), new Date(dateTo)),
        },
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
