import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource, Repository } from 'typeorm';
import { CarEntity } from '../src/modules/car/entity/car.entity';
import { createCar } from './car.fixture';
import { createCarDtoMockWithImage } from '../src/modules/car/service/__test__/car.fixture';
import * as path from 'path';
import { IMAGE_UPLOADER_SERVICE } from '../src/modules/imageUploader/interface/imageUploader.service.interface';

describe('Car E2E', () => {
  let app: INestApplication;
  let repository: Repository<CarEntity>;
  let database: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IMAGE_UPLOADER_SERVICE)
      .useValue({
        upload: jest.fn().mockResolvedValue('image-url'),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    database = app.get(DataSource);
    repository = database.getRepository(CarEntity);
  });

  afterEach(async () => {
    await database.synchronize(true);
  });

  describe(`GET /car`, () => {
    it('should get all the cars', async () => {
      await repository.save(createCar());
      await repository.save(createCar());
      return request(app.getHttpServer())
        .get('/car')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(2);
        });
    });
  });

  describe(`GET /car/:id`, () => {
    it('should get a car by id', async () => {
      const car = await repository.save(createCar());
      return request(app.getHttpServer())
        .get(`/car/${car.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.id).toBe(car.id);
        });
    });
  });

  describe(`POST /car`, () => {
    const car = createCarDtoMockWithImage();
    it('should create a car', async () => {
      return request(app.getHttpServer())
        .post('/car')
        .field('brand', car.brand)
        .field('model', car.model)
        .field('color', car.color)
        .field('kilometerMileage', car.kilometerMileage)
        .field('manufactureYear', car.manufactureYear)
        .field('passengers', car.passengers)
        .field('pricePerDay', car.pricePerDay)
        .field('transmission', car.transmission)
        .field('hasAirConditioning', car.hasAirConditioning)
        .attach('image', path.resolve(__dirname, './car-image.png'))
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.brand).toBe(car.brand);
          expect(res.body.image).toBe('image-url');
        });
    });
  });

  describe(`PUT /car/:id`, () => {
    it('should update a car', async () => {
      const car = await repository.save(createCar());
      return request(app.getHttpServer())
        .put(`/car/${car.id}`)
        .send({ brand: 'new brand' })
        .expect(200)
        .then((res) => {
          expect(res.body.id).toBe(car.id);
          expect(res.body.brand).toBe('new brand');
        });
    });
  });

  describe('DELETE /car/:id', () => {
    it('should delete a car', async () => {
      const car = await repository.save(createCar());
      return request(app.getHttpServer()).delete(`/car/${car.id}`).expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
