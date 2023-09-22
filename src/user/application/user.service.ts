import { Injectable } from '@nestjs/common';
import { IObserver } from 'src/bot/entities/dto/interface-bot';
import { Subject } from 'src/bot/observer/subject.service';

@Injectable()
export class UserService implements IObserver {
  constructor(private subject: Subject) {
    subject.registerObserver('start', this);
  }
  update(ctx) {
    // ctx.reply('');
  }
}
