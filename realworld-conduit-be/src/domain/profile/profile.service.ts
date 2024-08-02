import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProfileDto } from './dto/profile.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private databaseService: DatabaseService) {}
  async followUser(data: any, user: User) {
    const { username } = data;
    const followerUser = await this.databaseService.user.findUnique({
      where: { username: username },
    });
    console.log('followerUser: ', followerUser);
    if (!followerUser) {
      throw new NotFoundException(`${followerUser} does not exist`);
    }
    await this.databaseService.follow.create({
      data: {
        followingId: user.id,
        followerId: followerUser.id,
      },
    });
    return {
      username: followerUser.username,
      email: followerUser.email,
      bio: followerUser.shortBio,
      image: followerUser.avatar,
      isFollowed: true,
    };
  }
  async unFollowUser(data: any, user: User) {
    const { username } = data;
    console.log('data: ', data);
    const followingUser = await this.databaseService.user.findUnique({
      where: { username: username },
    });

    if (user.id === data.id) {
      throw new ConflictException('You can not follow yourselft');
    }
    if (!followingUser) {
      throw new NotFoundException(`${followingUser} does not exist`);
    }

    await this.databaseService.follow.deleteMany({
      where: {
        followingId: user.id,
        followerId: followingUser.id,
      },
    });
    return {
      username: followingUser.username,
      email: followingUser.email,
      bio: followingUser.shortBio,
      image: followingUser.avatar,
      isFollowed: false,
    };
  }
}
