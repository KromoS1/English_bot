import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './domain/entities/user.model';
import { BotModule } from 'src/bot/bot.module';
import { UserService } from './application/user.service';
import { UserQueryRepository } from './infrastructure/user.query.repository';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  providers: [UserService, UserQueryRepository, UserRepository],
  imports: [SequelizeModule.forFeature([User]), BotModule],
  exports: [UserService],
})
export class UserModule {}
