export interface IBookingsPagination<PaginationObject> {
  data: {
    bookings: PaginationObject[];
    page: number;
    limit: number;
    totalCount: number;
  };
}
