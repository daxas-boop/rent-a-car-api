import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cars')
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  manufactureYear: number;

  @Column()
  kilometerMileage: number;

  @Column()
  color: string;

  @Column()
  hasAirConditioning: boolean;

  @Column()
  passengers: number;

  @Column()
  transmission: string;

  @Column()
  pricePerDay: number;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
