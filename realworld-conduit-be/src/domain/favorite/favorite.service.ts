import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/service/base.service';
import { DatabaseService } from 'src/database/database.service';
import { ArticleService } from '../article/article.service';
import RequestWithUser from '../auth/requestWithUser.interface';

@Injectable()
export class FavoriteService extends BaseService<any, any> {
  constructor(
    databaseService: DatabaseService,
    private articleService: ArticleService,
  ) {
    super(databaseService, 'favorite');
  }

  private async getArticleOrThrow(slug: string): Promise<any> {
    const article = await this.articleService.findArticle(slug);
    if (!article) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    return article;
  }

  private formatArticleResponse(article: any, isFavorited: boolean) {
    return {
      author: {
        shortBio: article.author.shortBio,
        avatar: article.author.avatar,
        username: article.author.username,
      },
      slug: article.slug,
      content: article.content,
      description: article.description,
      favoritesCount: article.favourites.length,
      favorite: isFavorited,
      tag: article.tags,
    };
  }

  async favoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.getArticleOrThrow(slug);

    await this.databaseService.favourite.create({
      data: {
        userId: req.user.id,
        articleId: article.id,
      },
    });

    const updatedArticle = await this.articleService.findArticle(slug);
    return this.formatArticleResponse(updatedArticle, true);
  }

  async unFavoriteArticle(slug: string, req: RequestWithUser) {
    const article = await this.getArticleOrThrow(slug);

    await this.databaseService.favourite.deleteMany({
      where: {
        userId: req.user.id,
        articleId: article.id,
      },
    });

    const updatedArticle = await this.articleService.findArticle(slug);
    return this.formatArticleResponse(updatedArticle, false);
  }
}
