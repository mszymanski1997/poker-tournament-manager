import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TournamentLevelDto } from './tournament-level.dto';
import { AddonsDto, RakeDto } from './advanced-settings.dto';

export class CreateTournamentDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0, { message: 'The buy-in value must be at least 0' })
  buyIn!: number;

  @IsString()
  currency!: string;

  @IsNumber()
  @Min(1, { message: 'The starting stack must be above 0' })
  startingStack!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RakeDto)
  rake?: RakeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddonsDto)
  addons?: AddonsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TournamentLevelDto)
  levels!: TournamentLevelDto[];
}
