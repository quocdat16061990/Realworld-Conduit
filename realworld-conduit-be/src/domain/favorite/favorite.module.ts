import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [DatabaseModule, AuthModule, ArticleModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
