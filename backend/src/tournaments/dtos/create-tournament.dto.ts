import {
  Equals,
  IsArray,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class BaseLevelDto {
  @IsString()
  type!: 'blind' | 'break';

  @IsNumber()
  @Min(1, { message: 'The duration of the level must be at least 1 minute' })
  duration!: number;
}

export class BlindLevelDto extends BaseLevelDto {
  @Equals('blind')
  declare type: 'blind';

  @IsNumber()
  @Min(1, { message: 'The big blind value must be above 0' })
  smallBlind!: number;

  @IsNumber()
  @Min(1, { message: 'The small blind value must be above 0' })
  bigBlind!: number;

  @IsNumber()
  @Min(0, { message: 'The ante value must be at least 0' })
  ante!: number;
}

export class BreakLevelDto extends BaseLevelDto {
  @Equals('break')
  declare type: 'break';
}

export class CreateTournamentDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0, { message: 'The buy-in value must be at least 0' })
  buyIn!: number;

  @IsString()
  currency!: string;

  @IsNumber()
  @Min(1, { message: 'The statring stack must be above 0' })
  startingStack!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseLevelDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: BlindLevelDto, name: 'blind' },
        { value: BreakLevelDto, name: 'break' },
      ],
    },
  })
  levels!: (BlindLevelDto | BreakLevelDto)[];
}
