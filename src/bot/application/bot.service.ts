import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Telegraf } from 'telegraf';
import { KromLogger } from 'src/logger/logger.service';
import { BotException } from 'src/exception';
import { Subject } from '../observer/subject.service';
import { Command } from '../entities/dto/command.dto';
import { CommandsType, IBot } from '../entities/dto/interface-bot';
import { Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotService implements IBot {
  private _bot: Telegraf<Context<Update>>;

  constructor(
    private logger: KromLogger,
    private configService: ConfigService,
    private comm: Command,
    private subject: Subject,
  ) {}

  getBot() {
    return this._bot;
  }

  start() {
    try {
      this._bot = new Telegraf(this.configService.get('BOT_TOKEN'));
      this._bot.catch((err, ctx) => {
        throw new BotException(
          `Ooops, encountered an error for ${ctx.updateType} | ${err}`,
        );
      });
      this.createSubject();
      setTimeout(() => {
        this._bot.launch();
      }, 2000);
    } catch (e) {
      this.logger.error(e.message, e.stack, e.name);
    }
  }

  createSubject() {
    for (const c in this.comm) {
      this._bot.command(c, (ctx) => {
        this.subject.notifyObserver(c as CommandsType, ctx);
      });
    }
  }
}
