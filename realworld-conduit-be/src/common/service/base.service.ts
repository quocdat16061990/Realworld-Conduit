import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export class BaseService<CreateDto, UpdateDto> {
  constructor(
    protected databaseService: DatabaseService,
    protected readonly modelName: string,
  ) {}

  findMany() {
    return this.databaseService[this.modelName].findMany();
  }

  create(data: CreateDto) {
    return this.databaseService[this.modelName].create({ data });
  }

  findBySlug(slug: string) {
    return this.databaseService[this.modelName].findUnique({ where: { slug } });
  }
  findFirst(args: any) {
    return this.databaseService[this.modelName].findFirst(args);
  }
}
