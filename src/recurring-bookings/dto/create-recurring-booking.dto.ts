import {
  IsInt,
  Min,
  IsDateString,
  IsMilitaryTime,
  IsEnum,
  ArrayUnique,
  Validate,
} from 'class-validator';
import { DaysOfWeek } from '../recurring-booking.entity';
import { IsBeforeConstraint } from '../../bookings/custom-validation-classes/IsBeforeConstraint';

export class CreateRecurringBookingDto {
  @IsDateString()
  @Validate(IsBeforeConstraint, ['endDate'])
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsMilitaryTime()
  @Validate(IsBeforeConstraint, ['endTime'])
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @ArrayUnique()
  @IsEnum(DaysOfWeek, { each: true })
  daysOfWeek: DaysOfWeek[];

  @Min(1)
  @IsInt()
  roomId: number;
}
