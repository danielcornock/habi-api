import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';

import { AuthController } from './controllers/auth/auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [DatabaseErrorsService, AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  exports: [AuthService]
})
export class AuthModule {}
