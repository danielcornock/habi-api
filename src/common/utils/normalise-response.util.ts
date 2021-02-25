import mongoose, { Document } from 'mongoose';

export function normaliseResponse<T extends Document>(
  schema: mongoose.Schema<T>
) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      delete ret._id;
    }
  });
}
