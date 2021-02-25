import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseErrorsService } from './database-errors.service';

describe('DatabaseErrorsService', () => {
  let service: DatabaseErrorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseErrorsService],
    }).compile();

    service = module.get<DatabaseErrorsService>(DatabaseErrorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
