import { IsInt, Min, Max, IsDateString } from 'class-validator';

export class CreateOneTimeDto {
  id?: number;

  createdAt: Date;

  @IsDateString()
  meetingDate: Date;

  startTime: Date;

  endTime: Date;

  @IsInt()
  ownerId: number;

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
