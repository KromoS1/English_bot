import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Telegraf } from 'telegraf';
import { KromLogger } from 'src/logger/logger.service';
import { BotException } from 'src/exception';
import { Command } from '../entities/dto/command.dto';
import { CommandsType, HearsType, IBot } from '../entities/dto/interface-bot';
import { Update } from 'telegraf/typings/core/types/typegram';
import { logMsg, updateNameCommand } from 'src/helper/lib';
import { Hears } from '../entities/dto/hears.dto';
import { CommandSubject } from '../observer/command.subject';
import { HearsSubject } from '../observer/hears.subject';

@Injectable()
export class BotService implements IBot {
  private _bot: Telegraf<Context<Update>>;

  constructor(
    private logger: KromLogger,
    private configService: ConfigService,
    private comm: Command,
    private hears: Hears,
    private command_subject: CommandSubject,
    private hears_subject: HearsSubject,
    private kromLogger: KromLogger,
  ) {}

  getBot() {
    return this._bot;
  }

  start() {
    try {
      this._bot = new Telegraf(this.configService.get('BOT_TOKEN'));

      this._bot.catch((err, ctx) => {
        throw new BotException(`${ctx.updateType} | ${err}`);
      });

      this._bot.use(async (ctx, next) => {
        await next();

        this.kromLogger.writeLog('message', logMsg(ctx), 'BOT');
      });

      this._bot.on('message', (ctx) => {
        const chat_id = ctx.chat.id;
        const message_id = ctx.message.message_id;

        this._bot.telegram.forwardMessage(chat_id, chat_id, message_id);
      });

      this.createSubject();
      this._bot.launch();
    } catch (e) {
      this.logger.error(e.message, e.stack, e.name);
    }
  }

  createSubject() {
    for (const c in this.comm) {
      this._bot.command(c, (ctx) => {
        this.command_subject.notifyObserver(c as CommandsType, ctx);
      });
    }

    for (const h in this.hears) {
      this._bot.hears(updateNameCommand(h), (ctx) => {
        this.hears_subject.notifyObserver(h as HearsType, ctx);
      });
    }
  }
}
