import { Module } from '@nestjs/common';
import { CarController } from './controller/car.controller';
import { CarService } from './service/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entity/car.entity';
import { CAR_REPOSITORY } from './interfaces/car.respository.interface';
import { CarRepository } from './repository/car.repository';
import { ImageUploaderModule } from '../imageUploader/imageUploader.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), ImageUploaderModule],
  controllers: [CarController],
  providers: [
    {
      provide: CAR_REPOSITORY,
      useClass: CarRepository,
    },
    CarService,
  ],
})
export class CarModule {}
