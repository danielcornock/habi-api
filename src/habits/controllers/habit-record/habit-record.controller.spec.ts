import { Test, TestingModule } from '@nestjs/testing';
import { HabitRecordController } from './habit-record.controller';

describe('HabitRecordController', () => {
  let controller: HabitRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitRecordController],
    }).compile();

    controller = module.get<HabitRecordController>(HabitRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
