import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { filter, startCase } from 'lodash';
import {
  DatabaseError,
  MongoError,
  MongooseError,
  MongooseErrorContainer,
} from 'src/common/interfaces/database-error.interface';

@Injectable()
export class DatabaseErrorsService {
  public handle(dbError: DatabaseError): void {
    if ('errors' in dbError) {
      this.handleMongoose(dbError);
    } else if ('code' in dbError) {
      this.handleMongo(dbError);
    } else {
      Logger.error(dbError);
      throw new InternalServerErrorException();
    }
  }

  private handleMongoose(mongooseError: MongooseErrorContainer): void {
    const requiredErrors = filter(
      mongooseError.errors,
      (error: MongooseError) => error.kind === 'required'
    ).map((error: MongooseError) => error.path);

    if (requiredErrors.length) {
      throw new BadRequestException(
        `The following fields are required: ${requiredErrors
          .map(startCase)
          .join(', ')}.`
      );
    }
  }

  private handleMongo(mongoError: MongoError): void {
    if (mongoError.code === 11000) {
      throw new BadRequestException(
        'An account with that email address already exists'
      );
    }
  }
}
