import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { databaseUriFactory } from './config/database-uri-factory';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [
    HabitsModule,
    MongooseModule.forRootAsync({
      useFactory: databaseUriFactory
    }),
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
