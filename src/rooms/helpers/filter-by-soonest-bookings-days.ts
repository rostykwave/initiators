import { addDaysToDate } from 'src/helpers/add-days-to-date';
import { parseDateStringWithoutTime } from 'src/helpers/parse-date-string-without-time';

export const filterReccurringBookingsBySoonestBookingsDays = (
  allreccurringBookings,
  soonestBookingsDays: number,
) => {
  const today = new Date(parseDateStringWithoutTime(new Date()));
  const endSearchDate = addDaysToDate(today, soonestBookingsDays);

  const filtered = allreccurringBookings.filter(
    (rb) =>
      new Date(rb.meetingDate).getTime() <= new Date(endSearchDate).getTime(),
  );
  return filtered;
};
