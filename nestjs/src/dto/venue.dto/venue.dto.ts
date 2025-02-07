import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class VenueDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}
