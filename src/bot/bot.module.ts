import { Module } from '@nestjs/common';
import { BotService } from './application/bot.service';
import { ConfigService } from '@nestjs/config';
import { Command } from './entities/dto/command.dto';
import { LoggerModule } from 'src/logger/logger.module';
import { Subject } from './observer/subject.service';
import { Keyboard } from './application/keyboard.service';

@Module({
  providers: [BotService, ConfigService, Command, Subject, Keyboard],
  imports: [LoggerModule, LoggerModule],
  exports: [BotService, Subject, Command],
})
export class BotModule {}
