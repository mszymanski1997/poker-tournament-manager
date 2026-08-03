import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseLevel, BaseLevelSchema } from './tournament-level.schema';

export type TournamentDocument = HydratedDocument<Tournament>;

@Schema({ versionKey: false })
export class Tournament {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  buyIn!: number;

  @Prop({ required: true })
  currency!: string;

  @Prop({ required: true })
  startingStack!: number;

  @Prop({ type: [BaseLevelSchema] })
  levels!: BaseLevel[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
