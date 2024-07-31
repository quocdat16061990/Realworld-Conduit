import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class SignUpDto {
  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @MinLength(6)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Username',
  })
  @MaxLength(20)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Strongpassword@@',
    format: 'password',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
