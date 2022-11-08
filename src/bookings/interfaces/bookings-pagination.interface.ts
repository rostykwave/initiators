export interface IBookingsPagination<PaginationObject> {
  readonly bookings: PaginationObject[];
  page: number;
  limit: number;
  totalCount: number;
}
