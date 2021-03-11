import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

import { HabitTemplateCreate } from './habit-template-create.dto';

export class HabitTemplateUpdate extends PartialType(HabitTemplateCreate) {
  @IsBoolean()
  @IsOptional()
  isPaused: boolean;
}
