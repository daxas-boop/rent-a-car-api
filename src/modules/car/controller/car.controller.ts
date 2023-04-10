import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from '../service/car.service';
import { CreateCarDto } from '../dtos/create-car.dto';
import { UpdateCarDto } from '../dtos/update-car.dto';
import { Car } from '../car';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.carService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    image: Express.Multer.File,
  ) {
    createCarDto.image = image;
    return this.carService.create(createCarDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Body() updateCarDto: UpdateCarDto,
    @Param('id') id: number,
    image?: Express.Multer.File,
  ) {
    updateCarDto.image = image;
    return this.carService.update(updateCarDto, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.carService.delete(id);
  }
}
