export interface IRecurrentBooking {
  id: string;
  generatedFromRecurrentBookingWithId: number;
  createdAt: Date;
  meetingDate: Date;
  startTime: Date;
  endTime: Date;
}
