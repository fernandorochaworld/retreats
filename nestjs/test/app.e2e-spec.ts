import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import knexInstance from '../knex/knex';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Register ValidationPipe globally to handle exceptions properly.
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('/ (GET) No Argument', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body).toHaveLength(10);
      });
  });

  it('/ (GET) Limit 2', async () => {
    await request(app.getHttpServer())
      .get('/?limit=2')
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body).toHaveLength(2);
      });
  });

  it('/ (GET) Invalid Limit', async () => {
    await request(app.getHttpServer())
      .get('/?limit=abcd')
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        message: ['limit must be an integer number'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await knexInstance.destroy();
    await app.close();
  });
});
