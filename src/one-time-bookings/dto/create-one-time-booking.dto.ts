import { IsInt, Min, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateOneTimeBookingDto {
  @IsDateString()
  meetingDate: Date;

  @IsMilitaryTime()
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @Min(1)
  @IsInt()
  roomId: number;
}
