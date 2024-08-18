import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiOperationDecorator } from 'src/common/decorator/api-operation.decorator';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
    return this.commentService.createComment(slug, content, req);
  }

  @ApiOperationDecorator({
    type: 'slug',
    summary: 'Get Comment',
    description: 'Get Comment',
  })
  @Get(':slug/comment')
  @UseGuards(JwtAuthenticationGuard)
  async getComments(@Param('slug') slug: string, @Req() req: RequestWithUser) {
    return this.commentService.getComment(slug, req);
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
    return this.commentService.deleteComment(slug, id, req);
  }
}
