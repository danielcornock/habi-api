import { PartialType } from '@nestjs/mapped-types';

import { CreateHabitTemplate } from './create-habit-template.dto';

export class UpdateHabitTemplate extends PartialType(CreateHabitTemplate) {}
