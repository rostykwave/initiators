import { Transform } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { toDate, toNumber } from 'src/common/helpers/cast.helper';

export class findAllBookingsByOfficeIdInRangeDto {
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  officeId: number;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  startDate: Date;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  endDate: Date;
}
