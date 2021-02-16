import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { HabitTemplateCreate } from 'src/habits/dto/habit-template-create.dto';
import { HabitTemplate } from 'src/habits/schemas/habit-template.schema';

@Controller('habit-templates')
export class HabitTemplateController {
  constructor(
    @InjectModel(HabitTemplate.name)
    private habitTemplateRepo: Model<HabitTemplate>
  ) {}

  @Post()
  public async create(
    @Body() body: HabitTemplateCreate
  ): HttpResponse<HabitTemplate> {
    const data = await this.habitTemplateRepo.create(body);

    return { data };
  }

  @Get()
  public async getAll(): HttpResponse<HabitTemplate[]> {
    const data = await this.habitTemplateRepo.find();

    return { data };
  }
}
