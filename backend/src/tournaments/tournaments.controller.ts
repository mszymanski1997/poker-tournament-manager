import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  Patch,
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
  createTournament(@Body() body: CreateTournamentDto) {
    return this.tournamentsService.create(body);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.validateID(id);
    return this.tournamentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateID(id);
    return this.tournamentsService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTournamentDto) {
    this.validateID(id);
    return this.tournamentsService.update(id, body);
  }
}
