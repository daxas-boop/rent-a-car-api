import { Car } from '../car';
import { CreateCarDto } from '../dtos/create-car.dto';
import { UpdateCarDto } from '../dtos/update-car.dto';
import { CarEntity } from '../entity/car.entity';

export function mapDtoToClass(carDto: CreateCarDto | UpdateCarDto): Car {
  const car = new Car();
  for (const property in carDto) {
    car[property] = carDto[property];
  }
  car.hasAirConditioning = carDto.hasAirConditioning === 'yes';
  return car;
}

export function mapEntityToClass(carEntity: CarEntity): Car {
  const car = new Car();
  for (const property in carEntity) {
    car[property] = carEntity[property];
  }
  return car;
}
