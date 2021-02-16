import { IsDateString } from 'class-validator';

export class HabitWeekQuery {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
