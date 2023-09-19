import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BotService } from './application/bot.service';
import { ConfigService } from '@nestjs/config';
import { Command } from './command.dto';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [BotService, ConfigService, Command],
  imports: [UserModule, LoggerModule],
  exports: [BotService],
})
export class BotModule {}
