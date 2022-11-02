export const parseDateStringWithoutTime = (date = new Date()): string => {
  return date.toISOString().split('T')[0];
};
