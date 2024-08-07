import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ProfileDto } from 'src/domain/profile/dto/profile.dto';
export class CreateArticleDto {
  @ApiProperty({
    example: 'articleTitle',
    description: 'Article Title',
    format: 'article Title',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Article About',
    description: 'Article About',
    format: 'Article About',
    uniqueItems: true,
    minLength: 6,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  description: string;

  @ApiProperty({
    example: 'Article Content',
    description: 'Article Content',
    format: 'Article  Content',
    uniqueItems: true,
    minLength: 6,
    nullable: false,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Tags',
    format: 'Tags',
    type: [String],
    example: ['tag1', 'tag2', 'tag3'],
    uniqueItems: true,
    isArray: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  tags: string[];
}
