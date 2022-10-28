export const addDaysToDate = (startDate: Date, days: number): Date => {
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + days);
  return endDate;
};
