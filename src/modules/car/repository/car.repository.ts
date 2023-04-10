import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '../entity/car.entity';
import { Repository } from 'typeorm';
import { Car } from '../car';
import { mapEntityToClass } from '../mappers/car.mapper';
import { ICarRepository } from '../interfaces/car.respository.interface';

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
  ) {}
  async findAll() {
    const cars = await this.carRepository.find();
    return cars.map(mapEntityToClass);
  }

  async findById(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) throw new NotFoundException();
    return mapEntityToClass(car);
  }

  async create(car: Car) {
    return await this.carRepository.save(car);
  }

  async update(car: Car, id: number) {
    await this.carRepository.update(id, car);
    return await this.findById(id);
  }

  async delete(id: number) {
    const carToRemove = await this.findById(id);
    await this.carRepository.softRemove(carToRemove);
  }
}
