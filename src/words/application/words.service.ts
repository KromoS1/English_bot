import { Injectable } from '@nestjs/common';
import { HearsType, IObserver } from 'src/bot/entities/dto/interface-bot';
import { WordsQueryRepository } from '../infrastructure/words.query.repository';
import { resetNameCommand } from 'src/helper/lib';
import { WordsRepository } from '../infrastructure/words.repository';
import { Hears } from 'src/bot/entities/dto/hears.dto';
import { HearsSubject } from 'src/bot/observer/hears.subject';
import { BotService } from 'src/bot/application/bot.service';

@Injectable()
export class WordsService implements IObserver {
  constructor(
    private subject: HearsSubject,
    private hears: Hears,
    private wordsQueryRepo: WordsQueryRepository,
    private wordsRepo: WordsRepository,
  ) {
    subject.registerObserver(
      resetNameCommand(hears.add_words) as HearsType,
      this,
    );
  }

  acceptMessage(ctx) {
    const text = `Введите ваше фразу в таком формате: #words Hello:Привет`;

    ctx.replyWithHTML(text);
  }
}
