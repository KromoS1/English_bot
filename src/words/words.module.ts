import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordsService } from './application/words.service';
import { Words } from './domain/entities/words.model';
import { WordsQueryRepository } from './infrastructure/words.query.repository';

@Module({
  providers: [WordsService, WordsQueryRepository],
  imports: [SequelizeModule.forFeature([Words])],
  exports: [WordsService],
})
export class WordsModule {}
