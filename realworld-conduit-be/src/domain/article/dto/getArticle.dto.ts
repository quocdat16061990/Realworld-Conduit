import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class PagingQueryParamsDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset: number;
}
export class PagingDto<T> {
  @ApiProperty() content: T[];
  @ApiProperty() totalCount: number;
}

export class ArticleQueryParamsDto extends PagingQueryParamsDto {
  @ApiProperty() readonly tag: string;
  @ApiProperty() readonly author: string;
  @ApiProperty() readonly favorited: string;
}
