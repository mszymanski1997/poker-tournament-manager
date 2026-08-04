import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class Level {
  @Prop({ required: true, enum: ['blind', 'break'] })
  type!: 'blind' | 'break';

  @Prop({ required: true })
  duration!: number;

  @Prop({ required: false })
  smallBlind?: number;

  @Prop({ required: false })
  bigBlind?: number;

  @Prop({ required: false })
  ante?: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
