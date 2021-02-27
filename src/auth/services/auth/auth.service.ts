import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Secret, sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { DecodedJwt } from 'src/auth/interfaces/decoded-jwt.interface';
import { User } from 'src/auth/schemas/user.schema';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { googleClientId, jwtSecret } from 'src/config/env';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    private databaseErrors: DatabaseErrorsService
  ) {}

  public async getUserById(id: string): Promise<User> {
    return await this.userRepo.findById(id);
  }

  public createJwt(user: User): string {
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

  public async createUser(user: {
    name: string;
    email: string;
  }): Promise<User> {
    try {
      return await this.userRepo.create(user);
    } catch (e) {
      this.databaseErrors.handle(e);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ email });
  }

  public decodeJwt(token: string, secret: string): Promise<DecodedJwt> {
    const jwtVerify = promisify<string, Secret, any>(verify);

    return jwtVerify(token, secret);
  }

  public async verifyGoogleToken(token: string): Promise<TokenPayload> {
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
}
