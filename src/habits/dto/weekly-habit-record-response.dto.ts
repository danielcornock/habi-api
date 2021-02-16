import { Dictionary } from 'lodash';

import { HabitRecordResponse } from './habit-record-response.dto';

export type WeeklyHabitRecordResponse = Dictionary<HabitRecordResponse[]>;
