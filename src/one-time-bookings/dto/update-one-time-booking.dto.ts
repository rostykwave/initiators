import {
  IsInt,
  Min,
  IsDateString,
  IsMilitaryTime,
  Validate,
} from 'class-validator';
import { IsBeforeConstraint } from 'src/recurring-bookings/dto/custom-validation-classes/IsBeforeConstraint';

export class UpdateOneTimeBookingDto {
  @IsDateString()
  meetingDate: Date;

  @IsMilitaryTime()
  @Validate(IsBeforeConstraint, ['endTime'])
  startTime: Date;

  @IsMilitaryTime()
  endTime: Date;

  @Min(1)
  @IsInt()
  roomId: number;
}
