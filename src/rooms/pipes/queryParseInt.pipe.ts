import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryParseIntPipe implements PipeTransform {
  transform({ officeId, soonestBookingsDays }) {
    const officeIdNum = officeId ? Number.parseInt(officeId) : undefined;

    if (Number.isNaN(officeIdNum)) {
      throw new BadRequestException(
        'Request a valid "officeId" query parameter, type "number"',
      );
    }

    const soonestBookingsDaysNum = soonestBookingsDays
      ? Number.parseInt(soonestBookingsDays)
      : undefined;

    if (Number.isNaN(soonestBookingsDaysNum)) {
      throw new BadRequestException(
        'Request a valid "soonestBookingsDaysNum" query parameter, type "number"',
      );
    }

    return {
      officeId: officeIdNum,
      soonestBookingsDays: soonestBookingsDaysNum,
    };
  }
}
