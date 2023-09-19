import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.model';
import { IUserModelAttr } from '../domain/dto/user.service.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(userDto: IUserModelAttr) {
    return await this.usersRepository.create(userDto);
  }
}
