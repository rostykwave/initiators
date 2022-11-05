import { IsInt, Min, Max, IsDateString, Matches } from 'class-validator';

export class OneTimeBookingDto {

  // @IsDateString()
  // createdAt: Date;

  @IsDateString()
  meetingDate: Date;

  @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  startTime: Date;

  @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  endTime: Date;

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
