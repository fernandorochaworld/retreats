import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AppService, Venue } from './app.service';
import { VenueDto } from './dto/venue.dto/venue.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getVenues(@Query() query: VenueDto): Promise<Venue[]> {
    return this.appService.getVenues(query.limit);
  }
}
