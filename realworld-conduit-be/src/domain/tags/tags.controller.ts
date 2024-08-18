import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import { Tag } from '@prisma/client';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.getNewestTags();
  }
}
