import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [DatabaseModule, AuthModule, ArticleModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
