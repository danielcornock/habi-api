import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { normaliseResponse } from 'src/common/utils/normalise-response.util';

@Schema()
export class HabitTemplate extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: false })
  flair: string;

  @Prop({ type: Boolean })
  isPaused: boolean;
}

export const HabitTemplateSchema = SchemaFactory.createForClass(HabitTemplate);

normaliseResponse(HabitTemplateSchema);
