import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';
export class SignInDto {
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
    example: 'password',
    description: 'Strongpassword@@',
    format: 'password',
    uniqueItems: true,
    minLength: 6,
    maxLength: 255,
    nullable: false,
  })
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
