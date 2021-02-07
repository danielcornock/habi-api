import { Body, Controller, Post } from '@nestjs/common';
import { HabitTemplateCreate } from 'src/habits/dto/habit-template-create.dto';

@Controller('habit-template')
export class HabitTemplateController {
  @Post()
  public create(@Body() body: HabitTemplateCreate) {}
}
