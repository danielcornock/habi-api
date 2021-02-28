import { IsOptional, IsString } from 'class-validator';

export class HabitTemplateCreate {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  flair: string;

  @IsString()
  color: string;
}
