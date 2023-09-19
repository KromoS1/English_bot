import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { Command } from '../command.dto';
import { KromLogger } from 'src/logger/logger.service';
import { BotException } from 'src/exception';

@Injectable()
export class BotService {
  private bot;

  constructor(
    private logger: KromLogger,
    private configService: ConfigService,
    private comm: Command,
  ) {}

  getBot() {
    return this.bot;
  }

  start() {
    try {
      this.bot = new Telegraf(this.configService.get('BOT_TOKEN'));
      this.addListener();
      this.bot.launch();
      throw new BotException('Что-то с подключение к боту.');
    } catch (e) {
      this.logger.error(e.message, e.stack, e.name);
    }
  }

  addListener() {
    this.bot.command(this.comm.start, (ctx) => ctx.reply('Hello'));
    this.bot.command(this.comm.help, (ctx) => ctx.reply('What are you need?'));
  }
}
