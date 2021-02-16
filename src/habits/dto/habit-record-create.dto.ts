import { Transform } from 'class-transformer';
import { IsDateString, IsString } from 'class-validator';
import { isNumber } from 'lodash';
import { DateTime } from 'luxon';

export class HabitRecordCreate {
  @IsString()
  template: string;

  @IsDateString()
  @Transform((completedOn) => {
    if (isNumber(completedOn.value)) {
      return DateTime.fromMillis(completedOn.value).toISODate();
    } else {
      return DateTime.fromISO(completedOn.value).toISODate();
    }
  })
  completedOn: string;
}
