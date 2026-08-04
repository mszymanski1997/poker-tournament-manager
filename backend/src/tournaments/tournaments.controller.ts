import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  Patch,
  Headers,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dtos/create-tournament.dto';
import { Types } from 'mongoose';
import { UpdateTournamentDto } from './dtos/update-tournament-dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  private validateID(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid tournament ID format`);
    }
  }

  @Post()
  createTournament(
    @Body() body: CreateTournamentDto,
    @Headers('x-user-id') userId: string,
  ) {
    this.validateID(userId);
    return this.tournamentsService.create(body, userId);
  }

  @Get()
  findAll(@Headers('x-user-id') userId: string) {
    this.validateID(userId);
    return this.tournamentsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('x-user-id') userId: string) {
    this.validateID(id);
    this.validateID(userId);
    return this.tournamentsService.findOne(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-user-id') userId: string) {
    this.validateID(id);
    this.validateID(userId);
    return this.tournamentsService.remove(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTournamentDto,
    @Headers('x-user-id') userId: string,
  ) {
    this.validateID(id);
    this.validateID(userId);
    return this.tournamentsService.update(id, body, userId);
  }
}
