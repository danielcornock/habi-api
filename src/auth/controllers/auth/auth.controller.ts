import { Body, Controller, Post } from '@nestjs/common';
import { LoginResponse } from 'src/auth/dto/login-response.dto';
import { SocialLoginRequest } from 'src/auth/dto/social-login-request.dto';
import { SocialSignupRequest } from 'src/auth/dto/social-signup-request.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('social-signup/google')
  public async signupWithGoogle(
    @Body() body: SocialSignupRequest
  ): HttpResponse<LoginResponse> {
    const user = {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email.toLowerCase()
    };

    await this.authService.verifyGoogleToken(body.idToken);

    const savedUser = await this.authService.createUser(user);

    const authToken = this.authService.createJwt(savedUser);

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
    const decodedToken = await this.authService.verifyGoogleToken(body.idToken);
    const user = await this.authService.findUserByEmail(decodedToken.email);
    const authToken = this.authService.createJwt(user);

    return {
      data: {
        ...user.toJSON(),
        authToken
      }
    };
  }
}
