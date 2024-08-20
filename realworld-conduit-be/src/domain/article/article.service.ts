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
import { ArticleQueryParamsDto } from './dto/getArticle.dto';
import { BaseService } from 'src/common/service/base.service';

function generateSlug(title: string) {
  const slug = title.toLowerCase().split(' ').join('-');
  return slug;
}
@Injectable()
export class ArticleService extends BaseService<any, any> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'article');
  }

  findArticle(slug: string) {
    return this.findFirst({
      where: { slug },
      include: {
        author: {
          include: {
            followers: true,
            following: true,
          },
        },
        favourites: true,
        comments: true,
        tags: true,
      },
    });
  }
  async createArticle(data: CreateArticleDto, req: RequestWithUser) {
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

        author: true,
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
      include: {
        author: true,
        comments: true,
        favourites: true,
        tags: true,
      },
    });
    await this.databaseService.favourite.deleteMany({
      where: {
        userId: req.user.id,
        articleId: article.id,
      },
    });
    const commentIds = article.comments.map((comment) => comment.id);
    await this.databaseService.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    await this.databaseService.article.delete({
      where: { id: article.id },
    });
    return {
      message: 'Delete Article Successfully',
    };
  }
  async getArticleBySlug(slug: string) {
    const article = await this.findArticle(slug);
    const isFavorited = article.favourites.some((fav) => fav.userId);

    return {
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      slug: article.slug,
      authorId: article.authorId,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      author: {
        id: article.author.id,
        email: article.author.email,
        username: article.author.username,
        password: article.author.password,
        avatar: article.author.avatar,
        shortBio: article.author.shortBio,
        createdAt: article.author.createdAt,
        updatedAt: article.author.updatedAt,
      },
      favortiesCount: article.favourites.length,
      favourites: isFavorited,

      tags: article.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      })),
    };
  }

  async favoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.findArticle(slug);
    if (!article) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    await this.databaseService.favourite.create({
      data: {
        userId: req.user.id,
        articleId: article.id,
      },
    });

    const updatedArticle = await this.findArticle(slug);
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
      favorites: true,
      tag: updatedArticle.tags,
    };
  }

  async unFavoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.findArticle(slug);
    const favorite = article.favourites.find(
      (item) => item?.userId === req?.user?.id,
    );
    if (!article) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }

    await this.databaseService.favourite.delete({
      where: {
        id: favorite.id,
      },
    });
    const updatedArticle = await this.findArticle(slug);
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

  async getAllArticle(query: ArticleQueryParamsDto, req: RequestWithUser) {
    const { limit, offset, tag, author, favorite } = query;

    const where: Prisma.ArticleWhereInput = {};

    if (tag) {
      where.tags = {
        some: {
          name: tag,
        },
      };
    }

    if (author) {
      where.author = {
        username: author,
      };
    }

    if (favorite) {
      where.favourites = {
        some: {
          user: {
            username: favorite,
          },
        },
      };
    }
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

    const enhancedArticles = articles.map((article) => {
      const isFavorited = article.favourites.some((fav) => fav.userId);
      return {
        author: {
          shortBio: article.author.shortBio,
          avatar: article.author.avatar,
          username: article.author.username,
        },
        title: article.title,
        slug: article.slug,
        content: article.content,
        description: article.description,
        favoritesCount: article.favourites.length,
        favorite: isFavorited,
        tags: article.tags,
      };
    });
    return {
      enhancedArticles,
      totalCount,
    };
  }
  async getAllInformation() {
    const getAllArticle = await this.databaseService.article.findMany();
    return getAllArticle;
  }
}
