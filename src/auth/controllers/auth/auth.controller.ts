import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { LoginResponse } from 'src/auth/dto/login-response.dto';
import { SocialLoginRequest } from 'src/auth/dto/social-login-request.dto';
import { SocialSignupRequest } from 'src/auth/dto/social-signup-request.dto';
import { User } from 'src/auth/schemas/user.schema';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { googleClientId, jwtSecret } from 'src/config/env';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User.name)
    private userRepo: Model<User>,
    private databaseErrors: DatabaseErrorsService
  ) {}

  @Post('social-signup/google')
  public async signupWithGoogle(
    @Body() body: SocialSignupRequest
  ): HttpResponse<LoginResponse> {
    const user = {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email.toLowerCase()
    };

    await this.verifyGoogleToken(body.idToken);

    const savedUser = await this.createUser(user);

    const authToken = this.createJwt(savedUser);

    return {
      data: {
        ...savedUser.toJSON(),
        authToken
      }
    };
  }

  @Post('social-login/google')
  public async loginWithGoogle(
    @Body() body: SocialLoginRequest
  ): HttpResponse<LoginResponse> {
    const decodedToken = await this.verifyGoogleToken(body.idToken);
    const user = await this.userRepo.findOne({ email: decodedToken.email });
    const authToken = this.createJwt(user);

    return {
      data: {
        ...user.toJSON(),
        authToken
      }
    };
  }

  private async createUser(user: {
    name: string;
    email: string;
  }): Promise<User> {
    try {
      return await this.userRepo.create(user);
    } catch (e) {
      this.databaseErrors.handle(e);
    }
  }

  private async verifyGoogleToken(token: string): Promise<TokenPayload> {
    const client = new OAuth2Client(googleClientId);

    try {
      const decoded = await client.verifyIdToken({
        idToken: token,
        audience: googleClientId
      });

      return decoded.getPayload();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private createJwt(user: User): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      jwtSecret,
      {
        expiresIn: '90d'
      }
    );
  }
}
