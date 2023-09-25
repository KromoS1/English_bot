import { Markup } from 'telegraf';
import {
  IKeyboard,
  IObserver,
  KeyboardType,
} from '../entities/dto/interface-bot';
import { Injectable } from '@nestjs/common';
import { Command } from '../entities/dto/command.dto';
import { Subject } from '../observer/subject.service';

@Injectable()
export class Keyboard implements IKeyboard, IObserver {
  keyboard: KeyboardType = {
    main: [],
  };

  constructor(
    private comm: Command,
    private subject: Subject,
  ) {
    subject.registerObserver('start', this);
    this.initKeyBoardData();
  }

  initKeyBoardData() {
    this.keyboard.main = [
      [this.comm.start_game],
      [this.comm.get_point_month, this.comm.get_point_month],
      [this.comm.description, this.comm.refresh],
    ];
  }

  update(ctx) {
    switch (ctx.command) {
      case this.comm.start: {
        ctx.reply('Selected action', this.createKeyboard('main'));
      }
    }
  }

  createKeyboard(type: keyof KeyboardType) {
    return Markup.keyboard(this.keyboard[type]);
  }
}
