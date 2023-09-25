import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../domain/entities/user.model';

@Injectable()
export class UserQueryRepository {
  constructor(@InjectModel(User) private usersQueryRepository: typeof User) {}

  async getUserById(id: number) {
    return await this.usersQueryRepository.findOne({ where: { id } });
  }

  async getUserByChatId(chat_id: number) {
    return await this.usersQueryRepository.findOne({ where: { chat_id } });
  }
}
