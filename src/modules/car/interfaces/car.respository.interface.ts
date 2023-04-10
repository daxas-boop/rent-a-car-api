import { Car } from '../car';

export const CAR_REPOSITORY = 'CAR_REPOSITORY';

export interface ICarRepository {
  findAll(): Promise<Car[]>;
  findById(id: number): Promise<Car>;
  create(car: Car): Promise<Car>;
  update(car: Car, id: number): Promise<Car>;
  delete(id: number): Promise<void>;
}
