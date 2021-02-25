import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { normaliseResponse } from 'src/common/utils/normalise-response.util';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

normaliseResponse(UserSchema);
