import { Car } from '../src/modules/car/car';

export function createCar(): Car {
  return {
    id: undefined,
    brand: 'brand',
    model: 'model',
    color: 'color',
    kilometerMileage: 1,
    manufactureYear: 1,
    passengers: 1,
    pricePerDay: 1,
    transmission: 'manual',
    hasAirConditioning: true,
    image: 'image',
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
  };
}
