import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Words } from '../domain/entities/words.model';

@Injectable()
export class WordsQueryRepository {
  constructor(@InjectModel(Words) private wordsQueryRepository: typeof Words) {}
}
