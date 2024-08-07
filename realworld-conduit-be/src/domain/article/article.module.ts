import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ArticlesController } from './artile.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ArticlesController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
