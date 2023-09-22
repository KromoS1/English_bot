import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './domain/entities/user.model';
import { BotModule } from 'src/bot/bot.module';
import { UserService } from './application/user.service';

@Module({
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User]), BotModule],
  exports: [UserService],
})
export class UserModule {}
