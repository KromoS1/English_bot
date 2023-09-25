import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Words } from '../domain/entities/words.model';
import { IWordsModelAttr } from '../domain/dto/words.dto';

@Injectable()
export class WordsRepository {
  constructor(@InjectModel(Words) private wordsRepository: typeof Words) {}

  async createWord(wordsDto: IWordsModelAttr) {
    return await this.wordsRepository.create(wordsDto);
  }
}
