import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [DatabaseModule, AuthModule, ArticleModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
