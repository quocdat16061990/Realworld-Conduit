import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsNotEmpty } from 'class-validator';
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
