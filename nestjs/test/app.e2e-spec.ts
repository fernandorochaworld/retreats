import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AppService, Venue } from '../src/app.service';

describe('AppController (e2e)', () => {
  const venues: Venue[] = [
    {
      id: 1,
      name: 'Venue 1',
      country_iso2: 'US',
      state: 'CA',
      city: 'Los Angeles',
    },
    {
      id: 2,
      name: 'Venue 2',
      country_iso2: 'US',
      state: 'CA',
      city: 'San Francisco',
    },
  ];
  let app: INestApplication<App>;
  const appService: AppService = {
    getVenues: () => Promise.resolve(venues),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(AppService)
      // .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    // Register ValidationPipe globally to handle exceptions properly.
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/ (GET) No Argument', () => {
    return (
      request(app.getHttpServer())
        .get('/')
        .expect(200)
        // .expect(venues)
        .then((response) => {
          expect(response.body).toHaveLength(10);
        })
    );
  });

  it('/ (GET) Limit 2', () => {
    return (
      request(app.getHttpServer())
        .get('/?limit=2')
        .expect(200)
        // .expect(venues)
        .then((response) => {
          expect(response.body).toHaveLength(2);
        })
    );
  });

  it('/ (GET) Invalid Limit', () => {
    return request(app.getHttpServer())
      .get('/?limit=abcd')
      .expect(400)
      .expect({
        message: ['limit must be an integer number'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
