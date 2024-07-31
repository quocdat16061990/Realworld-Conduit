import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import JwtRefreshGuard from './jwt-refresh-token.guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User and Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperationDecorator({
    type: SignInDto,
    summary: 'Sign In',
    description: 'Sign In',
  })
  @UseGuards(LocalAuthenticationGuard)
  @Post('sign-in')
  @ApiBody({ type: SignInDto })
  async signIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.authService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return {
      message: 'Login Successfully',
      isAuthenticated: true,
    };
  }

  @ApiOperationDecorator({
    type: SignUpDto,
    summary: 'Sign Up',
    description: 'Sign Up',
  })
  @UseInterceptors(SerializeInterceptor)
  @Post('sign-up')
  async signUp(@Body() signUpData: SignUpDto) {
    return await this.authService.registerUser(signUpData);
  }
  @Get('user')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async getCurrentUser(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Get('refreshToken')
  @UseGuards(JwtRefreshGuard)
  refreshToken(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @ApiOperationDecorator({
    type: UpdateUserDto,
    summary: 'Update User',
    description: 'Update User',
  })
  @Patch('user')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async updateCurrentUser(@Body() updateUser: UpdateUserDto) {
    return this.authService.updateUser(updateUser);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.authService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get('check-auth')
  async checkAuth(@Req() request: RequestWithUser) {
    if (request.user) {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }
}
