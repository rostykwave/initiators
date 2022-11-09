import { Office } from '../office.entity';

export interface IOfficesRepository {
  findOneById(id: number): Promise<Office>;
}
