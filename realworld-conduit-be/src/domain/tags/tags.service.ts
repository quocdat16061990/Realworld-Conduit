import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/common/service/base.service';
import { DatabaseService } from 'src/database/database.service';
import { ArticleService } from '../article/article.service';
import { Prisma } from '@prisma/client';

interface Tag {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TagsService extends BaseService<any, any> {
  constructor(
    databaseService: DatabaseService,
    private articleService: ArticleService,
  ) {
    super(databaseService, 'tags');
  }

  async getNewestTags() {
    const newestArticle = await this.databaseService.article.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const allTags: Tag[] = newestArticle.flatMap((article) => article.tags);

    const uniqueTags = [
      ...new Map(allTags.map((tag) => [tag.id, tag])).values(),
    ];

    const tags = uniqueTags
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);


    return tags;
  }
}
