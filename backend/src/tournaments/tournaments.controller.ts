import { Body, Controller, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dtos/create-tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private tournamentsService: TournamentsService) {}

  @Post()
  createTournament(@Body() body: CreateTournamentDto) {
    return this.tournamentsService.create(body);
  }
}
