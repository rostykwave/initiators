export interface IBookingsInRange<T> {
  data: {
    period: {
      startDate: Date;
      endDate: Date;
    };
    readonly bookings: T[];
  };
}
