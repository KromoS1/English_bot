import { Markup } from 'telegraf';
import {
  IKeyboard,
  IObserver,
  KeyboardType,
} from '../entities/dto/interface-bot';
import { Injectable } from '@nestjs/common';
import { Command } from '../entities/dto/command.dto';
import { Hears } from '../entities/dto/hears.dto';
import { CommandSubject } from '../observer/command.subject';

@Injectable()
export class Keyboard implements IKeyboard, IObserver {
  keyboard: KeyboardType = {
    main: [],
  };

  constructor(
    private hears: Hears,
    private comm: Command,
    private subject: CommandSubject,
  ) {
    this.subject.registerObserver('start', this);
    this.initKeyBoardData();
  }

  initKeyBoardData() {
    this.keyboard.main = [
      [this.hears.start_game, this.hears.add_words],
      [this.hears.get_points_month, this.hears.get_points_all],
      [this.hears.description, this.hears.refresh],
    ];
  }

  acceptMessage(ctx) {
    switch (ctx.command) {
      case this.comm.start: {
        ctx.reply(`Hi, I'm English Bot!`, this.createKeyboard('main'));
        break;
      }
    }
  }

  createKeyboard(type: keyof KeyboardType) {
    return Markup.keyboard(this.keyboard[type]);
  }
}
