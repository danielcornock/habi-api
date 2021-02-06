import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HabitTemplate extends Document {
  @Prop({ type: String })
  title: string;
}

export const HabitTemplateSchema = SchemaFactory.createForClass(HabitTemplate);
