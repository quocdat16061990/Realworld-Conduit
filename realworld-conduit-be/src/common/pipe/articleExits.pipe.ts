import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArticleExistPipe implements PipeTransform {
  constructor(private databaseService: DatabaseService) {}
  async transform(userId: number) {
    const article = await this.databaseService.article.findFirst({
      where: { id: userId },
    });

    return article.id;
  }
  //pipe -> transform data truoc khi no vao service
  //ex:
}
