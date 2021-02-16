import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

HabitTemplateSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
  }
});
