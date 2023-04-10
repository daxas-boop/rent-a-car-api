import { CreateCarDto } from '../../dtos/create-car.dto';
import { UpdateCarDto } from '../../dtos/update-car.dto';

export function updateCarDtoMockWithImage(): UpdateCarDto {
  return {
    brand: 'brand',
    color: 'color',
    hasAirConditioning: 'yes',
    image: {
      buffer: Buffer.from('image'),
      originalname: 'image.png',
      destination: 'destination',
      encoding: 'encoding',
      fieldname: 'fieldname',
      filename: 'filename',
      mimetype: 'mimetype',
      path: 'path',
      size: 1,
      stream: null,
    },
  };
}

export function createCarDtoMockWithImage(): CreateCarDto {
  return {
    brand: 'brand',
    color: 'color',
    hasAirConditioning: 'yes',
    kilometerMileage: 1,
    model: 'model',
    pricePerDay: 1,
    passengers: 1,
    transmission: 'manual',
    manufactureYear: 1,
    image: {
      buffer: Buffer.from('image'),
      originalname: 'image.png',
      destination: 'destination',
      encoding: 'encoding',
      fieldname: 'fieldname',
      filename: 'filename',
      mimetype: 'mimetype',
      path: 'path',
      size: 1,
      stream: null,
    },
  };
}
