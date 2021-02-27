import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { HabitTemplateCreate } from 'src/habits/dto/habit-template-create.dto';
import { HabitTemplate } from 'src/habits/schemas/habit-template.schema';

@Controller('habit-templates')
@UseGuards(AuthGuard)
export class HabitTemplateController {
  constructor(
    @InjectModel(HabitTemplate.name)
    private habitTemplateRepo: Model<HabitTemplate>
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
}
