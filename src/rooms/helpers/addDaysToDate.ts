export const addDaysToDate = (date: Date, days: number): Date => {
  const nextDate = new Date();
  nextDate.setDate(date.getDate() + days);
  return nextDate;
};
