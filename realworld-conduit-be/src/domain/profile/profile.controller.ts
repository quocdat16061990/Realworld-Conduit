import {
  Controller,
  Post,
  UseInterceptors,
  UseGuards,
  Param,
  Delete,
  Req,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorator/user.decorator';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { ProfileService } from './profile.service';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Follow a user',
    description: 'Follow a user by username',
  })
  @ApiParam({
    name: 'username',
    description: 'Username of the profile you want to follow',
    type: 'string',
    required: true,
  })
  @Post('/:username/follow')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async followUser(
    @Req() user: RequestWithUser,
    @Param('username') username: string,
  ) {
    return this.profileService.followUser(username, user);
  }

  @ApiOperation({
    summary: 'Unfollow a user',
    description: 'Unfollow a user by username',
  })
  @ApiParam({
    name: 'username',
    description: 'Username of the profile you want to unfollow',
    type: 'string',
    required: true,
  })
  @Delete('/:username/unfollow')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async unfollowUser(
    @Req() user: RequestWithUser,
    @Param('username') username: string,
  ) {
    return this.profileService.unFollowUser(username, user);
  }

  @Patch('/:username/update-profile')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async updateProfile(
    @Param('email') email: string,
    @Body() updateProfile: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(email, updateProfile);
  }
}
