import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config';
import { AuthModule } from './domain/auth/auth.module';
import { ProfileModule } from './domain/profile/profile.module';
import { ArticleModule } from './domain/article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    DatabaseModule,
    AuthModule,
    ProfileModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
