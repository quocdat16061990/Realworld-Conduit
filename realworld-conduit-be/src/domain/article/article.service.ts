import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ArticleQueryParamsDto,
  PagingDto,
  PagingQueryParamsDto,
} from './dto/getArticle.dto';

function generateSlug(title: string) {
  const slug = title.toLowerCase().split(' ').join('-');
  return slug;
}
@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createArticle(
    data: Prisma.ArticleCreateInput & { tags: string[] },
    req: RequestWithUser,
  ) {
    const { title, description, content, tags } = data;
    const tagConnectOrCreate = tags.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName },
    }));
    const newArticle: Prisma.ArticleCreateInput = {
      title,
      description,
      content,
      slug: generateSlug(title),
      tags: {
        connectOrCreate: tagConnectOrCreate,
      },
      author: {
        connect: { id: req.user.id },
      },
    };
    return await this.databaseService.article.create({
      data: newArticle,
      include: {
        tags: true,
      },
    });
  }

  async updateArticle(
    id: number,
    data: Partial<Omit<Prisma.ArticleUpdateInput, 'tags'>> & {
      tags?: string[];
    },
  ) {
    const { title, description, content, tags, ...otherData } = data;
    let updateData: Prisma.ArticleUpdateInput = { ...otherData };
    if (title !== undefined) {
      updateData.title = title;
      updateData.slug = generateSlug(title as string);
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (content !== undefined) {
      updateData.content = content;
    }
    if (tags && tags.length > 0) {
      const tagConnectOrCreate = tags.map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      }));
      updateData.tags = { set: [], connectOrCreate: tagConnectOrCreate };
    }
    return await this.databaseService.article.update({
      where: { id },
      data: updateData,
      include: { tags: true },
    });
  }
  async deleteArticle(slug: string, req: RequestWithUser) {
    const article = await this.databaseService.article.findFirst({
      where: { slug },
      select: { authorId: true },
    });

    if (!article || article.authorId !== req.user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this article',
      );
    }
    await this.databaseService.article.delete({
      where: { id: req.user.id },
    });
    return {
      message: 'Delete Article Successfully',
    };
  }
  async getArticleBySlug(slug: string) {
    const article = await this.databaseService.article.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });
    return article;
  }

  async favoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.databaseService.article.findFirst({
      where: { slug },
      include: {
        author: true,
        favourites: true,
        tags: true,
      },
    });
    if (!article) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    await this.databaseService.favourite.create({
      data: {
        userId: req.user.id,
        articleId: article.id,
      },
    });

    const updatedArticle = await this.databaseService.article.findFirst({
      where: { slug },
      include: {
        author: true,
        favourites: true,
        tags: true,
      },
    });
    return {
      author: {
        shortBio: updatedArticle.author.shortBio,
        avatar: updatedArticle.author.avatar,
        username: updatedArticle.author.username,
      },
      slug: updatedArticle.slug,
      content: updatedArticle.content,
      descriptioon: updatedArticle.description,
      favoritesCount: updatedArticle.favourites.length,
      favorites: true,
      tag: updatedArticle.tags,
    };
  }

  async unFavoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.databaseService.article.findFirst({
      where: { slug },
      include: {
        author: true,
        favourites: true,
        tags: true,
      },
    });
    const favorite = article.favourites.find(
      (item) => item.userId === req.user.id,
    );
    if (!article) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    await this.databaseService.favourite.delete({
      where: {
        id: favorite.id,
      },
    });
    const updatedArticle = await this.databaseService.article.findFirst({
      where: { slug },
      include: {
        author: true,
        favourites: true,
        tags: true,
      },
    });
    return {
      author: {
        shortBio: updatedArticle.author.shortBio,
        avatar: updatedArticle.author.avatar,
        username: updatedArticle.author.username,
      },
      slug: updatedArticle.slug,
      content: updatedArticle.content,
      description: updatedArticle.description,
      favoritesCount: updatedArticle.favourites.length,
      favorite: false,
      tag: updatedArticle.tags,
    };
  }
  async createComment(
    slug: string,
    comment: CreateCommentDto,
    req: RequestWithUser,
  ) {
    const article = await this.databaseService.article.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
        tags: true,
        favourites: true,
        comments: true,
      },
    });
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
    const article = await this.databaseService.article.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
        tags: true,
        favourites: true,
        comments: true,
      },
    });
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
  async getAllArticle(query: PagingQueryParamsDto) {
    const { limit, offset } = query;

    const where: Prisma.ArticleWhereInput = {};
    const [articles, totalCount] = await Promise.all([
      this.databaseService.article.findMany({
        where,
        include: {
          author: true,
          tags: true,
          favourites: true,
        },
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.databaseService.article.count({ where }),
    ]);
    return {
      content: articles,
      totalCount,
    };
  }
  async getAllInformation() {
    const getAllArticle = await this.databaseService.article.findMany();
    console.log('getAllArticle: ', getAllArticle);
    return getAllArticle;
  }
}
