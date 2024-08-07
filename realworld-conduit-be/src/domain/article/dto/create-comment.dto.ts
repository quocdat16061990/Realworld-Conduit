import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { ProfileDto } from 'src/domain/profile/dto/profile.dto';
export class CreateCommentDto {
  @ApiProperty({
    example: 'Comment Content',
    description: 'Comment Content',
    format: 'Comment Content',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  content: string;
}
