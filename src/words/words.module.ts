import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordsService } from './application/words.service';
import { Words } from './domain/entities/words.model';
import { WordsQueryRepository } from './infrastructure/words.query.repository';
import { BotModule } from 'src/bot/bot.module';
import { WordsRepository } from './infrastructure/words.repository';
import { User } from 'src/user/domain/entities/user.model';

@Module({
  providers: [WordsService, WordsQueryRepository, WordsRepository],
  imports: [SequelizeModule.forFeature([Words, User]), BotModule],
  exports: [WordsService],
})
export class WordsModule {}
