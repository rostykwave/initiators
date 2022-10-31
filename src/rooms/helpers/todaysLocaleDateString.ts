export const todaysLocaleDateString = (): string => {
  const todaysDateArray = new Date().toLocaleString().split(',')[0].split('.');
  return `${todaysDateArray[2]}-${todaysDateArray[1]}-${todaysDateArray[0]}`;
};
