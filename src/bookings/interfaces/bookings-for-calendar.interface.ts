export interface IBookingsForCalendar<T> {
  data: {
    period: {
      startDate: string;
      endDate: string;
    };
    readonly bookings: T[];
  };
}
