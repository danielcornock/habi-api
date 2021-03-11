import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { HabitTemplateCreate } from 'src/habits/dto/habit-template-create.dto';
import { HabitTemplateUpdate } from 'src/habits/dto/habit-template-update.dto';
import { HabitRecord } from 'src/habits/schemas/habit-record.schema';
import { HabitTemplate } from 'src/habits/schemas/habit-template.schema';

@Controller('habit-templates')
@UseGuards(AuthGuard)
export class HabitTemplateController {
  constructor(
    @InjectModel(HabitTemplate.name)
    private habitTemplateRepo: Model<HabitTemplate>,
    @InjectModel(HabitRecord.name)
    private habitRecordRepo: Model<HabitRecord>
  ) {}

  @Post()
  public async create(
    @Body() body: HabitTemplateCreate,
    @UserId() user: string
  ): HttpResponse<HabitTemplate> {
    const dbPayload = {
      ...body,
      user
    };

    const data = await this.habitTemplateRepo.create(dbPayload);

    return { data };
  }

  @Get()
  public async getAll(@UserId() user: string): HttpResponse<HabitTemplate[]> {
    const data = await this.habitTemplateRepo.find({ user });

    return { data };
  }

  @Delete('/:id')
  public async deleteOne(
    @Param('id') id: string,
    @UserId() user: string
  ): Promise<void> {
    await this.habitTemplateRepo.findOneAndDelete({
      _id: id,
      user
    });
    await this.habitRecordRepo.deleteMany({ user, template: id });
  }

  @Patch('/:id')
  public async setIsPaused(
    @UserId() user: string,
    @Param('id') id: string,
    @Body() payload: HabitTemplateUpdate
  ): HttpResponse<HabitTemplate> {
    const data = await this.habitTemplateRepo.findOneAndUpdate(
      { _id: id, user },
      { isPaused: payload.isPaused },
      { new: true }
    );

    return { data: data };
  }
}
