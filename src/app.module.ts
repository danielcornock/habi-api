import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { databaseUriFactory } from './config/database-uri-factory';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [
    HabitsModule,
    MongooseModule.forRootAsync({
      useFactory: databaseUriFactory,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
