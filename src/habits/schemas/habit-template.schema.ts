import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { normaliseResponse } from 'src/common/utils/normalise-response.util';

@Schema()
export class HabitTemplate extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: true })
  flair: string;
}

export const HabitTemplateSchema = SchemaFactory.createForClass(HabitTemplate);

normaliseResponse(HabitTemplateSchema);
