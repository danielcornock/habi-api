import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HabitRecordController } from './controllers/habit-record/habit-record.controller';
import { HabitTemplateController } from './controllers/habit-template/habit-template.controller';
import { HabitRecord, HabitRecordSchema } from './schemas/habit-record.schema';
import { HabitTemplate, HabitTemplateSchema } from './schemas/habit-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HabitRecord.name,
        schema: HabitRecordSchema,
      },
      {
        name: HabitTemplate.name,
        schema: HabitTemplateSchema,
      },
    ]),
  ],
  controllers: [HabitRecordController, HabitTemplateController],
  providers: [],
})
export class HabitsModule {}
