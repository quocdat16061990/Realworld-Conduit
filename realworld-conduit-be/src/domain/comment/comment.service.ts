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
    const result = await this.databaseService.comment.create({
      data: newComment,
      include: {
        user: true,
      },
    });
    const newResult = structuredClone(result);
    const updateComment = {
      id: newResult.id,
      content: newResult.content,
      createdAt: newResult.createdAt,
      updatedAt: newResult.updatedAt,
      author: {
        id: newResult.user.id,
        email: newResult.user.email,
        username: newResult.user.username,
      },
    };
    return updateComment;
  }
  async getComment(slug: string, req: RequestWithUser) {
    const comments = await this.databaseService.comment.findMany({
      where: {
        article: {
          slug,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return comments;
  }
  async deleteComment(slug: string, commentId: number, req: RequestWithUser) {
    const comment = await this.databaseService.comment.findFirst({
      where: {
        id: commentId,
        article: {
          slug,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
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
