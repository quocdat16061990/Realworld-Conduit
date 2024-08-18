import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BaseService } from 'src/common/service/base.service';
import { Prisma } from '@prisma/client';
import RequestWithUser from '../auth/requestWithUser.interface';
import { DatabaseService } from 'src/database/database.service';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentService extends BaseService<any, any> {
  constructor(
    databaseService: DatabaseService,
    private articleService: ArticleService,
  ) {
    super(databaseService, 'comment');
  }
  async createComment(
    slug: string,
    comment: CreateCommentDto,
    req: RequestWithUser,
  ) {
    const article = await this.articleService.findArticle(slug);
    const { content } = comment;
    const newComment: Prisma.CommentCreateInput = {
      content,
      user: {
        connect: { id: req.user.id },
      },
      article: {
        connect: { id: article.id },
      },
    };
    return this.databaseService.comment.create({
      data: newComment,
      include: {
        user: true,
      },
    });
  }
  async getComment(slug: string, req: RequestWithUser) {
    const article = await this.articleService.findArticle(slug);
    if (!article) throw new NotFoundException('Article does not exits');
    return article;
  }
  async deleteComment(slug: string, commentId: number, req: RequestWithUser) {
    const comment = await this.databaseService.comment.findFirst({
      where: {
        id: commentId,
        article: {
          slug,
        },
      },
    });
    if (!comment) throw new NotFoundException('This Comment does not exist');
    await this.databaseService.comment.delete({
      where: {
        id: comment.id,
      },
    });
    return {
      message: 'Delete Comment Successfully',
    };
  }
}
