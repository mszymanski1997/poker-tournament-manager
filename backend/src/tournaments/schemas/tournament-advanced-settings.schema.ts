import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class RakeSettings {
  @Prop({ default: false })
  enable!: boolean;
  @Prop({ default: 0 })
  value!: number;
}

export const RakeSettingsSchema = SchemaFactory.createForClass(RakeSettings);

@Schema({ _id: false, versionKey: false })
export class AddonsSettings {
  @Prop({ default: false })
  enable!: boolean;
  @Prop({ default: 0 })
  value!: number;
  @Prop({ default: 0 })
  count!: number;
}

export const AddonsSettingsSchema =
  SchemaFactory.createForClass(AddonsSettings);
