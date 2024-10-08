import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProfileDto } from './dto/profile.dto';
import { Prisma, User } from '@prisma/client';
import RequestWithUser from '../auth/requestWithUser.interface';
import { BaseService } from 'src/common/service/base.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProfileService extends BaseService<any, any> {
  constructor(
    databaseService: DatabaseService,
    private authService: AuthService,
  ) {
    super(databaseService, 'user');
  }
  async followUser(username: string, user: RequestWithUser) {
    const followerUser = await this.databaseService.user.findUnique({
      where: { username },
    });
    if (!followerUser) {
      throw new NotFoundException(`${followerUser} does not exist`);
    }

    await this.databaseService.follow.create({
      data: {
        followingId: user?.user?.id,
        followerId: followerUser.id,
      },
    });
    const followerCount = await this.databaseService.follow.count({
      where: { followerId: followerUser.id },
    });
    return {
      username: followerUser.username,
      email: followerUser.email,
      bio: followerUser.shortBio,
      image: followerUser.avatar,
      followerCount,
      isFollowed: true,
    };
  }
  async unFollowUser(username: string, user: RequestWithUser) {
    const followingUser = await this.databaseService.user.findUnique({
      where: { username: username },
    });
    const followRelationship = await this.databaseService.follow.findFirst({
      where: {
        followingId: user?.user?.id,
        followerId: followingUser.id,
      },
    });
    console.log('followRelationship: ', followRelationship);
    await this.databaseService.follow.delete({
      where: {
        id: followRelationship.id,
      },
    });
    const followingCount = await this.databaseService.follow.count({
      where: { followerId: followingUser.id },
    });
    return {
      username: followingUser.username,
      email: followingUser.email,
      bio: followingUser.shortBio,
      image: followingUser.avatar,
      followingCount,
      isFollowed: false,
    };
  }
  async updateProfile(email: string, data: UpdateProfileDto) {
    const { avatar, username, shortBio, password, ...otherData } = data;

    const userProfile = await this.authService.getByEmail(data.email);
    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    let updateData: Prisma.UserUpdateInput = { ...otherData };

    if (username !== undefined) {
      updateData.username = username;
    }
    if (shortBio !== undefined) {
      updateData.shortBio = shortBio;
    }
    if (avatar !== undefined) {
      updateData.avatar = avatar;
    }
    if (password !== undefined) {
      updateData.password = await this.authService.hashPassword(password);
    }

    return await this.databaseService.user.update({
      where: { email },
      data: updateData,
    });
  }
  async getProfile(req: RequestWithUser) {
    const { user } = req;
    const profile = await this.databaseService.user.findFirst({
      where: {
        email: user.email,
      },
      include: {
        followers: true,
        following: true,
      },
    });
    return profile;
  }
}
