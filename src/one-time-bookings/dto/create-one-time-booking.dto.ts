import { IsInt, Min, Max, IsDateString, IsMilitaryTime } from 'class-validator';

export class CreateOneTimeBookingDto {
  @IsDateString()
  meetingDate: Date;

  @IsMilitaryTime()
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
