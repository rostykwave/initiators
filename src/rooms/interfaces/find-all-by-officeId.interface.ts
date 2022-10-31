import { IAllRoomsUpdated } from './all-rooms-updated.interface';

export interface IFindAllByOfficeId {
  data: {
    rooms: IAllRoomsUpdated[];
  };
}
