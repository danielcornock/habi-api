import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { groupBy } from 'lodash';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { HabitRecordCreate } from 'src/habits/dto/habit-record-create.dto';
import { HabitWeekQuery } from 'src/habits/dto/habit-week-query.dto';
import { WeeklyHabitRecordResponse } from 'src/habits/dto/weekly-habit-record-response.dto';
import { HabitRecord } from 'src/habits/schemas/habit-record.schema';

@Controller('habit-records')
export class HabitRecordController {
  constructor(
    @InjectModel(HabitRecord.name) private habitRecordRepo: Model<HabitRecord>
  ) {}

  @Post()
  public async createRecord(
    @Body() body: HabitRecordCreate
  ): HttpResponse<HabitRecord> {
    const data = await (await this.habitRecordRepo.create(body))
      .populate('template')
      .execPopulate();

    return { data };
  }

  @Get()
  public async getRecordsInRange(
    @Query() query: HabitWeekQuery
  ): HttpResponse<WeeklyHabitRecordResponse> {
    const data = await this.habitRecordRepo
      .find({
        completedOn: {
          $gte: query.startDate,
          $lte: query.endDate
        }
      })
      .populate('template');

    const groupedData = groupBy(data, (item) => item.completedOn);

    return { data: (groupedData as unknown) as WeeklyHabitRecordResponse };
  }

  @Delete(':id')
  public async deleteRecord(@Param('id') id: string): Promise<void> {
    await this.habitRecordRepo.findByIdAndDelete(id);
  }
}
