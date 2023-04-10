import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './modules/car/entity/car.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'test' ? 'test' : 'rent_cars',
      entities: [CarEntity],
    }),
    CarModule,
  ],
})
export class AppModule {}
