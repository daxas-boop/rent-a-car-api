import { Test } from '@nestjs/testing';
import { CarService } from '../car.service';
import { CAR_REPOSITORY } from '../../interfaces/car.respository.interface';
import { IMAGE_UPLOADER_SERVICE } from '../../../imageUploader/interface/imageUploader.service.interface';
import { Car } from '../../car';
import {
  createCarDtoMockWithImage,
  updateCarDtoMockWithImage,
} from './car.fixture';

describe('CarService', () => {
  const repositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const imageUploaderMock = {
    upload: jest.fn(),
  };

  let carService: CarService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CAR_REPOSITORY,
          useValue: repositoryMock,
        },
        {
          provide: IMAGE_UPLOADER_SERVICE,
          useValue: imageUploaderMock,
        },
        CarService,
      ],
    }).compile();

    carService = await moduleRef.get(CarService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result = ['car'];
      repositoryMock.findAll.mockReturnValue(result);
      expect(await carService.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a car', async () => {
      const result = 'car';
      repositoryMock.findById.mockReturnValue(result);
      expect(await carService.findById(1)).toBe(result);
    });

    it('should call the repository with the id', async () => {
      await carService.findById(1);
      expect(repositoryMock.findById).toBeCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call the repository with the car', async () => {
      const createCarDto = createCarDtoMockWithImage();
      await carService.create(createCarDto);

      let carAfterMapping = new Car();
      carAfterMapping = {
        ...createCarDto,
        hasAirConditioning: true,
        id: undefined,
        image: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      };

      expect(repositoryMock.create).toBeCalledWith(carAfterMapping);
    });

    it('should call the repository with a Car instance', async () => {
      const car = createCarDtoMockWithImage();
      await carService.create(car);
      expect(repositoryMock.create).toBeCalledWith(expect.any(Car));
    });

    it('should call the imageUploaderService upload method with the image', async () => {
      const car = createCarDtoMockWithImage();
      await carService.create(car);
      expect(imageUploaderMock.upload).toBeCalledWith(
        car.image.buffer,
        car.image.originalname,
      );
    });
  });

  describe('update', () => {
    it('should call the repository with id and car', async () => {
      const car = { brand: 'car' };
      await carService.update(car, 1);
      expect(repositoryMock.update).toBeCalledWith(car, 1);
    });

    it('should call the repository with a Car instance', async () => {
      const car = { brand: 'car' };
      await carService.update(car, 1);
      expect(repositoryMock.update).toBeCalledWith(expect.any(Car), 1);
    });

    it('should call the imageUploaderService upload method with the image', async () => {
      const car = updateCarDtoMockWithImage();
      await carService.update(car, 1);
      expect(imageUploaderMock.upload).toBeCalledWith(
        car.image.buffer,
        car.image.originalname,
      );
    });
  });

  describe('delete', () => {
    it('should call the repository with id', async () => {
      await carService.delete(1);
      expect(repositoryMock.delete).toBeCalledWith(1);
    });
  });
});
