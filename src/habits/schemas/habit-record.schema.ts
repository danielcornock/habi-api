import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { normaliseResponse } from 'src/common/utils/normalise-response.util';

@Schema()
export class HabitRecord extends Document {
  @Prop({ type: Types.ObjectId, ref: 'HabitTemplate' })
  template: string;

  @Prop({ type: String })
  completedOn: string;
}

export const HabitRecordSchema = SchemaFactory.createForClass(HabitRecord);

normaliseResponse(HabitRecordSchema);
