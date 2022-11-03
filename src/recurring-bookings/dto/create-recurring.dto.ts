import {
  IsInt,
  Min,
  Max,
  IsDateString,
  Matches,
  IsEnum,
} from 'class-validator';
import { DaysOfWeek } from '../recurring-booking.entity';

export class CreateRecurringDto {
  id?: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  startTime: Date;

  @Matches(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
  endTime: Date;

  @IsEnum(DaysOfWeek, { each: true })
  daysOfWeek: DaysOfWeek[];

  @Min(1)
  @Max(8)
  @IsInt()
  roomId: number;
}
