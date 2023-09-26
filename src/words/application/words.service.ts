import { Injectable } from '@nestjs/common';
import { Command } from 'src/bot/entities/dto/command.dto';
import { IObserver } from 'src/bot/entities/dto/interface-bot';
import { Subject } from 'src/bot/observer/subject.service';
import { WordsQueryRepository } from '../infrastructure/words.query.repository';
import { userString } from 'src/helper/lib';
import { WordsRepository } from '../infrastructure/words.repository';

@Injectable()
export class WordsService implements IObserver {
  constructor(
    private subject: Subject,
    private comm: Command,
    private wordsQueryRepo: WordsQueryRepository,
    private wordsRepo: WordsRepository,
  ) {
    subject.registerObserver('add_words', this);
  }

  update(ctx) {
    console.log(userString(ctx));
  }
}
