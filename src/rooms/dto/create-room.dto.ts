import { IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  floor: number;

  @IsString()
  description: string;

  @IsNumber()
  maxPeople: number;

  @IsNumber()
  minPeople: number;

  @IsString()
  officeName: string;
}
