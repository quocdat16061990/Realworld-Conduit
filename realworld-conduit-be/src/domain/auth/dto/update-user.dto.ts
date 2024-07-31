import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: "URL of the user's avatar",
    format: 'uri',
    nullable: true,
  })
  avatar: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username',
    minLength: 3,
    maxLength: 30,
    nullable: false,
  })
  username: string;

  @ApiProperty({
    example: 'Passionate software developer and tech enthusiast.',
    description: 'Short biography of the user',
    maxLength: 500,
    nullable: true,
  })
  shortBio: string;

  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email address',
    format: 'email',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123!',
    description: 'Password',
    minLength: 8,
    maxLength: 50,
    nullable: false,
  })
  password: string;
}
