import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';

import { AuthController } from './controllers/auth/auth.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  controllers: [AuthController],
  providers: [DatabaseErrorsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ]
})
export class AuthModule {}
