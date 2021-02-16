import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class HabitRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'HabitTemplate' })
  template: string;

  @Prop({ type: String })
  completedOn: string;
}

export const HabitRecordSchema = SchemaFactory.createForClass(HabitRecord);

HabitRecordSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
  }
});
