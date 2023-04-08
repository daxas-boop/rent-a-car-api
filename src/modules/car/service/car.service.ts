import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from '../dtos/create-car.dto';
import { mapDtoToClass } from '../mappers/car.mapper';
import { Car } from '../car';
import {
  CAR_REPOSITORY,
  ICarRepository,
} from '../interfaces/car.respository.interface';
import { UpdateCarDto } from '../dtos/update-car.dto';
import {
  IMAGE_UPLOADER_SERVICE,
  IimageUploaderService,
} from '../../imageUploader/interface/imageUploader.service.interface';

@Injectable()
export class CarService {
  constructor(
    @Inject(CAR_REPOSITORY)
    private carRepository: ICarRepository,
    @Inject(IMAGE_UPLOADER_SERVICE)
    private imageUploaderService: IimageUploaderService,
  ) {}
  async findAll(): Promise<Car[]> {
    try {
      return await this.carRepository.findAll();
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async findById(id: number): Promise<Car> {
    try {
      return await this.carRepository.findById(id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async create(createCarDto: CreateCarDto) {
    try {
      const car = mapDtoToClass(createCarDto);
      const image_url = await this.imageUploaderService.upload(
        createCarDto.image.buffer,
        createCarDto.image.originalname,
      );
      car.image = image_url;
      return await this.carRepository.create(car);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(updateCarDto: UpdateCarDto, id: number) {
    try {
      const car = mapDtoToClass(updateCarDto);
      if (updateCarDto.image) {
        const image_url = await this.imageUploaderService.upload(
          updateCarDto.image.buffer,
          updateCarDto.image.originalname,
        );
        car.image = image_url;
      }
      return await this.carRepository.update(car, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async delete(id: number) {
    try {
      return await this.carRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
