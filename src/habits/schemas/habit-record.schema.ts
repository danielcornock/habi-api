import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class HabitRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'HabitTemplate' })
  templateId: string;

  @Prop({ type: String })
  completedAt: string;
}

export const HabitRecordSchema = SchemaFactory.createForClass(HabitRecord);
