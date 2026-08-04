import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tournament, TournamentDocument } from './schemas/tournament.schema';
import { CreateTournamentDto } from './dtos/create-tournament.dto';
import { UpdateTournamentDto } from './dtos/update-tournament-dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel(Tournament.name)
    private readonly tournamentModel: Model<TournamentDocument>,
  ) {}

  async create(tournament: CreateTournamentDto) {
    return this.tournamentModel.create(tournament);
  }

  async findAll() {
    return this.tournamentModel.find({});
  }

  async findOne(id: string) {
    const tournament = await this.tournamentModel.findById(id);

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return tournament;
  }

  async remove(id: string) {
    const deletedTournament = await this.tournamentModel.findByIdAndDelete(id);

    if (!deletedTournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return deletedTournament;
  }

  async update(id: string, attrs: UpdateTournamentDto) {
    const updatedTournament = await this.tournamentModel.findByIdAndUpdate(
      id,
      attrs,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return updatedTournament;
  }
}
