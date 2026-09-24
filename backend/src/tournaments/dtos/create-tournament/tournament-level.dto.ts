import { Min, IsOptional, IsEnum, IsNumber } from 'class-validator';

export enum LevelType {
  BLIND = 'blind',
  BREAK = 'break',
}

export class TournamentLevelDto {
  @IsEnum(LevelType, { message: 'Type must be either blind or break' })
  type!: LevelType;

  @IsNumber()
  @Min(1, { message: 'The duration of the level must be at least 1 minute' })
  duration!: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'The small blind value must be above 0' })
  smallBlind?: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'The big blind value must be above 0' })
  bigBlind?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The ante value must be at least 0' })
  ante?: number;
}
