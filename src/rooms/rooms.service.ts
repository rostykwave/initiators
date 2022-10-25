import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from 'src/offices/office.entity';
import { Repository } from 'typeorm';
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

  //       async findAll(): Promise<Room[]> {
  //     return this.roomRepository.find();
  //   }

  //   async findOne(id: number): Promise<Room> {
  //     return this.roomRepository.findOneBy({ id });
}
