export interface IBookingsInRange<T> {
  data: {
    period: {
      startDate: string;
      endDate: string;
    };
    readonly bookings: T[];
  };
}
