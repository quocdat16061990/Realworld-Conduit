import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PagingQueryParamsDto } from './dto/getArticle.dto';
import { ArticleExistPipe } from 'src/common/pipe/articleExits.pipe';
import { UserReq } from 'src/common/decorator/user.decorator';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticleService) {}

  @ApiOperationDecorator({
    type: CreateArticleDto,
    summary: 'Create Article',
    description: 'Create Article',
  })
  @Post('articles')
  @UseGuards(JwtAuthenticationGuard)
  async createArticle(
    @Body() data: CreateArticleDto,
    @Req() req: RequestWithUser,
  ) {
    return this.articleService.createArticle(data, req);
  }

  @ApiOperationDecorator({
    type: CreateArticleDto,
    summary: 'Create Article',
    description: 'Create Article',
  })
  @Put('articles/:id')
  @UseGuards(JwtAuthenticationGuard)
  async updateArticle(
    @Param('id', ArticleExistPipe) id: number,
    @Body()
    data: CreateArticleDto,
  ) {
    return this.articleService.updateArticle(id, data);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Get an Article',
    description: 'Get an Article',
  })
  @Delete('articles/:slug')
  @UseGuards(JwtAuthenticationGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @Req() req: RequestWithUser,
  ) {
    return this.articleService.deleteArticle(slug, req);
  }
  @ApiOperationDecorator({
    type: 'Tag',
    summary: 'Get Popular Tag',
    description: 'Get Popular Tag',
  })
  @Get('tags')
  async getTags() {
    return await this.articleService.getAllInformation();
  }
  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Get an Article',
    description: 'Get an Article',
  })
  @Get(':slug')
  async getArticle(@Param('slug') slug: string) {
    return this.articleService.getArticleBySlug(slug);
  }

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
    return this.articleService.favoriteArticle(slug, req);
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
    return this.articleService.unFavoriteArticle(slug, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Create Comment',
    description: 'Create Comment',
  })
  @Post(':slug/comment')
  @UseGuards(JwtAuthenticationGuard)
  async createComment(
    @Param('slug') slug: string,
    @Body() content: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    return this.articleService.createComment(slug, content, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Get Comment',
    description: 'Get Comment',
  })
  @Get(':slug/comment')
  @UseGuards(JwtAuthenticationGuard)
  async getComments(@Param('slug') slug: string, @Req() req: RequestWithUser) {
    return this.articleService.getComment(slug, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Delete Comment',
    description: 'Delete Comment',
  })
  @Delete(':slug/comment/:id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.articleService.deleteComment(slug, id, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Get All Article',
    description: 'Get All Article',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit number of articles returned (default is 20)',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    description: 'Offset/skip number of articles (default is 0)',
    required: false,
  })
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getAllArticle(
    @Query() query: PagingQueryParamsDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.articleService.getAllArticle(query);
  }


}
