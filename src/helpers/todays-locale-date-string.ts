export const todaysLocaleDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};
