export class CreateRoomDto {
  id?: number;
  name: string;
  floor: number;
  description: string;
  maxPeople: number;
  minPeople: number;
  officeId: number;
}
