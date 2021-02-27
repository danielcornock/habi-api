import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { DecodedJwt } from 'src/auth/interfaces/decoded-jwt.interface';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { jwtSecret } from 'src/config/env';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IncomingMessage & {
      user: User;
    } = context.switchToHttp().getRequest();

    const decodedJwt = await this.getDecodedJwt(request.headers.authorization);

    request.user = await this.authService.getUserById((decodedJwt as any).id);

    return true;
  }

  private async getDecodedJwt(token: string): Promise<DecodedJwt> {
    try {
      const decodedJwt = await this.authService.decodeJwt(token, jwtSecret);

      return decodedJwt;
    } catch (e) {
      throw new UnauthorizedException(
        'Unfortunately your session has expired. Please log in again.'
      );
    }
  }
}
