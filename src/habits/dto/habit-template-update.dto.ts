import { PartialType } from '@nestjs/mapped-types';

import { HabitTemplateCreate } from './habit-template-create.dto';

export class HabitTemplateUpdate extends PartialType(HabitTemplateCreate) {}
