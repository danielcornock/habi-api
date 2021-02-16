import { IsString } from 'class-validator';

export class HabitTemplateCreate {
  @IsString()
  title: string;

  @IsString()
  flair: string;

  @IsString()
  color: string;
}
