import { addDaysToDate } from 'src/helpers/add-days-to-date';
import { todaysLocaleDateString } from 'src/helpers/todays-locale-date-string';

export const filterBySoonestBookingsDays = (
  allreccurringBookings,
  soonestBookingsDays: number,
) => {
  // console.log(soonestBookingsDays);
  // console.log(typeof soonestBookingsDays);
  // return allreccurringBookings;
  const today = new Date(todaysLocaleDateString());
  const endSearchDate = addDaysToDate(today, soonestBookingsDays);
  // const endSearchDate = today.getDate() + soonestBookingsDays;
  // const endSearchDate = new Date().setDate(
  //   today.getDate() + soonestBookingsDays,
  // );

  console.log('endSearchDate', endSearchDate);
  const filtered = allreccurringBookings.filter(
    (rb) =>
      new Date(rb.meetingDate).getTime() <= new Date(endSearchDate).getTime(),
  );
  return filtered;
};
