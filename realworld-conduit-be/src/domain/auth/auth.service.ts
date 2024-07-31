import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';
import TokenPayload from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { strict } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(data: Prisma.UserCreateInput) {
    const { email } = data;
    const userExits = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (userExits) {
      throw new ConflictException('User already exits ');
    }
    const hashedPassword = await this.hashPassword(data.password);
    const newUser = {
      email: data.email,
      password: hashedPassword,
      username: data.username,
    };
    return this.databaseService.user.create({
      data: newUser,
    });
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  async getById(id: number) {
    const userExits = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (userExits) {
      return userExits;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async getByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.getByEmail(email);
      await this.comparePassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    console.log('currentHashedRefreshToken: ', currentHashedRefreshToken);
    await this.databaseService.user.update({
      where: { id: userId },
      data: { refreshToken: currentHashedRefreshToken },
    });
  }
  async removeRefreshToken(userId: number) {
    return this.databaseService.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
  getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${+process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }
  getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${+process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return {
      cookie,
      token,
    };
  }
  getCookiesForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
  async updateUser(data: Prisma.UserUpdateInput) {
    const { email, password, avatar, shortBio, username } = data;
    const userUpdate: Prisma.UserUpdateInput = {};

    if (username) userUpdate.username = username;
    if (shortBio) userUpdate.shortBio = shortBio;
    if (avatar) userUpdate.avatar = avatar;

    if (password) {
      const hashedPassword = await this.hashPassword(password as string);
      userUpdate.password = hashedPassword;
    }
    if (email) {
      userUpdate.email = email;
    }
    const updateUser = await this.databaseService.user.update({
      where: { email: email as string },
      data: userUpdate,
    });
    return updateUser;
  }
}
