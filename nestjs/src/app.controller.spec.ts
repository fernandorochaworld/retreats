import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, Venue } from './app.service';

describe('AppController', () => {
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
    {
      id: 3,
      name: 'Venue 3',
      country_iso2: 'US',
      state: 'FL',
      city: 'Miami',
    },
  ];

  let app: INestApplication;
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();

    appService = app.get(AppService);
    appController = app.get(AppController);

    jest.spyOn(appService, 'getVenues').mockImplementation(async () => venues);
  });

  describe('getVenues', () => {
    it('should return an array of 10 venues', async () => {
      const result = await appController.getVenues({ limit: 10 });
      expect(result).toBe(venues);
      expect(appService.getVenues).toHaveBeenCalledWith(10);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
