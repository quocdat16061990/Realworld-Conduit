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
  @ApiProperty({ required: false })
  @IsOptional()
  tag: string;

  @ApiProperty({ required: false })
  @IsOptional()
  author: string;

  @ApiProperty({ required: false })
  @IsOptional()
  favorite: string;
}
