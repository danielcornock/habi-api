import { Logger } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { devDatabaseUriString, isDevelopment } from './env';

export function databaseUriFactory(): MongooseModuleOptions {
  if (isDevelopment) {
    Logger.log('Connecting to DEVELOPMENT database', 'DatabaseFactory');
    return {
      uri: devDatabaseUriString,
    };
  } else {
    throw new Error('Invalid environment set. Unable to connect to database.');
  }
}
