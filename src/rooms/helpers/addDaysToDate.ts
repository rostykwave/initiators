export const addDaysToDate = (startDate: Date, days: number): Date => {
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + days);
  return endDate;
  //Notice! Be careful about timezone, Date saves only 0000tumezone, so you have to tell frontEnd this small issue
  // console.log(
  //   'endDate',
  //   endDate.toLocaleString('ua', { timeZone: 'Europe/Kiev' }),
  // );
};
