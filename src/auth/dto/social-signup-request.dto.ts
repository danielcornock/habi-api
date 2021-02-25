import { IsEmail, IsString } from 'class-validator';

export class SocialSignupRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  idToken: string;
}
