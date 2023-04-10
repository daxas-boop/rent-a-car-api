import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  manufactureYear: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  kilometerMileage: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsIn(['yes', 'no'])
  hasAirConditioning: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  passengers: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['manual', 'automatic'])
  transmission: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  pricePerDay: number;

  image: Express.Multer.File;
}
