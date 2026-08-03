import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ discriminatorKey: 'type', _id: false, versionKey: false })
export class BaseLevel {
  @Prop({ required: true })
  type!: string;
  @Prop({ required: true })
  duration!: number;
}

export const BaseLevelSchema = SchemaFactory.createForClass(BaseLevel);

@Schema({ _id: false, versionKey: false })
export class BlindLevel extends BaseLevel {
  @Prop({ required: true })
  smallBlind!: number;

  @Prop({ required: true })
  bigBlind!: number;

  @Prop({ required: true })
  ante!: number;
}

export const BlindLevelSchema = SchemaFactory.createForClass(BlindLevel);

@Schema({ _id: false, versionKey: false })
export class BreakLevel extends BaseLevel {}

export const BreakLevelSchema = SchemaFactory.createForClass(BreakLevel);
