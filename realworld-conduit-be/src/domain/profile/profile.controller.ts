import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { ProfileDto } from './dto/profile.dto';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { ProfileService } from './profile.service';
import { UserReq } from 'src/common/decorator/user.decorator';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  // @ApiOperationDecorator({
  //   type: ProfileDto,
  //   summary: 'Get a profile',
  //   description: 'Get a profile',
  // })
  // @Get(':username')
  // async getProfileUser(@Body() username: ProfileDto) {
  //   return username;
  // }

  @ApiOperationDecorator({
    type: ProfileDto,
    summary: 'Follow',
    description: 'Follow',
  })
  @Post('/follow')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async followUser(@UserReq() user: any, @Body() username: ProfileDto) {
    return this.profileService.followUser(username, user);
  }

  @ApiOperationDecorator({
    type: ProfileDto,
    summary: 'Follow',
    description: 'Follow',
  })
  @Delete('/follow')
  @UseInterceptors(SerializeInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  async unFollowUser(@UserReq() user: any, @Body() username: ProfileDto) {
    return this.profileService.unFollowUser(username, user);
  }
}
