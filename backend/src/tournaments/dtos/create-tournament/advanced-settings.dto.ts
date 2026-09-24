import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class RakeDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Rake value cannot be negative' })
  value?: number;
}

export class AddonsDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Value of addon must be more than 0' })
  value?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Addon count cannot be negative' })
  count?: number;
}
