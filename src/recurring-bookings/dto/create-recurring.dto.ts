import { IsInt, Min, Max, IsDateString, IsDate } from 'class-validator';
import { Guest } from 'src/guests/guest.entity';
import { DaysOfWeek } from '../recurring-booking.entity';

export class CreateRecurringDto {
  id?: number;

  // @IsDate()
  createdAt: Date;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  startTime: Date;

  endTime: Date;

  daysOfWeek: DaysOfWeek[];

  @IsInt()
  ownerId: number;

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
