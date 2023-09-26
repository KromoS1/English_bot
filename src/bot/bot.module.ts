import { Module } from '@nestjs/common';
import { BotService } from './application/bot.service';
import { ConfigService } from '@nestjs/config';
import { Command } from './entities/dto/command.dto';
import { LoggerModule } from 'src/logger/logger.module';
import { CommandSubject } from './observer/command.subject';
import { Keyboard } from './application/keyboard.service';
import { Hears } from './entities/dto/hears.dto';
import { HearsSubject } from './observer/hears.subject';

@Module({
  providers: [
    BotService,
    ConfigService,
    Command,
    HearsSubject,
    CommandSubject,
    Keyboard,
    Hears,
  ],
  imports: [LoggerModule, LoggerModule],
  exports: [BotService, HearsSubject, CommandSubject, Command, Hears],
})
export class BotModule {}
