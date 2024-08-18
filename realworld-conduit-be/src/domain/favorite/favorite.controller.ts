import {
  Controller,
  Post,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Favorite Article',
    description: 'Favorite Article',
  })
  @Post(':slug/favorites')
  @UseGuards(JwtAuthenticationGuard)
  async favoriteArticle(
    @Param('slug') slug: string,
    @Req() req: RequestWithUser,
  ) {
    return this.favoriteService.favoriteArticle(slug, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Unfavorite Article',
    description: 'Unfavorite Article',
  })
  @Delete(':slug/favorites')
  @UseGuards(JwtAuthenticationGuard)
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @Req() req: RequestWithUser,
  ) {
    return this.favoriteService.unFavoriteArticle(slug, req);
  }
}
