import { IsString } from 'class-validator';

export class SocialLoginRequest {
  @IsString()
  idToken: string;
}
