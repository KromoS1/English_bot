import { Injectable } from '@nestjs/common';
import { Command } from 'src/bot/entities/dto/command.dto';
import { IObserver } from 'src/bot/entities/dto/interface-bot';
import { UserQueryRepository } from '../infrastructure/user.query.repository';
import { UserRepository } from '../infrastructure/user.repository';
import { CommandSubject } from 'src/bot/observer/command.subject';

@Injectable()
export class UserService implements IObserver {
  constructor(
    private subject: CommandSubject,
    private comm: Command,
    private userQueryRepo: UserQueryRepository,
    private userRepo: UserRepository,
  ) {
    subject.registerObserver('start', this);
  }

  async acceptMessage(ctx) {
    switch (ctx.command) {
      case this.comm.start: {
        const user = await this.userQueryRepo.getUserByChatId(ctx.chat.id);

        if (!user) {
          const { id, first_name, last_name, username } = ctx.chat;
          const instance = {
            chat_id: id,
            fullname: `${first_name} ${last_name}`,
            username,
          };

          const newUser = await this.userRepo.createUser(instance);

          ctx.reply(`Greetings, ${newUser.fullname}`);
        } else {
          ctx.reply(`Oooo ${user.fullname}, I'm glad you're back =]`);
        }

        break;
      }
    }
  }
}
