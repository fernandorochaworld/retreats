import { Injectable } from '@nestjs/common';

// ! You'll need this when querying the database
import knexInstance from '../knex/knex';

// ! Left here for ease
export interface Venue {
  id: number;
  name: string;
  country_iso2: string;
  state: string;
  city: string;
}

const DEFAULT_LIMIT_INDEX_VENUE = 10;

@Injectable()
export class AppService {
  async getVenues(limit: number = DEFAULT_LIMIT_INDEX_VENUE): Promise<Venue[]> {
    return await knexInstance<Venue>('venues').limit(limit);
  }
}
