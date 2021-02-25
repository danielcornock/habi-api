import { Dictionary } from 'lodash';

export interface MongooseErrorContainer {
  errors: Dictionary<MongooseError>;
}

export interface MongooseError {
  kind: string;
  path: string;
  properties: { message: string };
}

export interface MongoError {
  code: number;
}

export type DatabaseError = MongooseErrorContainer | MongoError;
