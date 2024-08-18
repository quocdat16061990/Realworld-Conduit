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
import { ArticleQueryParamsDto } from './dto/getArticle.dto';
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
  async getAllArticle(
    @Query() query: ArticleQueryParamsDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.articleService.getAllArticle(query, req);
  }
}
