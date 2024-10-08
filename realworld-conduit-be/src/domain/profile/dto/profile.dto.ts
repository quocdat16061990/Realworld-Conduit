import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsString, IsNotEmpty } from 'class-validator';

export class ProfileDto {
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

  // @ApiProperty({
  //   description: 'Bio',
  // })
  // @MaxLength(20)
  // @MinLength(4)
  // @IsString()
  // @IsNotEmpty()
  // @IsString()
  // @IsNotEmpty()
  // shortBio: string | null;

  // @ApiProperty({
  //   description: 'Username',
  // })
  // @MaxLength(20)
  // @MinLength(4)
  // @IsString()
  // @IsNotEmpty()
  // @IsString()
  // @IsNotEmpty()
  // avatar: string | null;

  // @ApiProperty() following: boolean;
}
