import { Test, TestingModule } from '@nestjs/testing';
import { HabitTemplateController } from './habit-template.controller';

describe('HabitTemplateController', () => {
  let controller: HabitTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitTemplateController],
    }).compile();

    controller = module.get<HabitTemplateController>(HabitTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
