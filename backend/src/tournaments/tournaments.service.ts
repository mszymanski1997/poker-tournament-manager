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

  async create(tournament: CreateTournamentDto, userId: string) {
    return this.tournamentModel.create({ ...tournament, owner: userId });
  }

  async findAll(userId: string) {
    return this.tournamentModel.find({ owner: userId });
  }

  async findOne(id: string, userId: string) {
    const tournament = await this.tournamentModel.findOne({
      _id: id,
      owner: userId,
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return tournament;
  }

  async remove(id: string, userId: string) {
    const deletedTournament = await this.tournamentModel.findOneAndDelete({
      _id: id,
      owner: userId,
    });

    if (!deletedTournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return deletedTournament;
  }

  async update(id: string, attrs: UpdateTournamentDto, userId: string) {
    const updatedTournament = await this.tournamentModel.findOneAndUpdate(
      { _id: id, owner: userId },
      attrs,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!updatedTournament) {
      throw new NotFoundException(`Tournament with ID "${id}" not found`);
    }

    return updatedTournament;
  }
}
