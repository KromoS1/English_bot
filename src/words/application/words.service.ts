import { Injectable } from '@nestjs/common';
import { Column, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from 'src/user/domain/entities/user.model';

@Injectable()
export class WordsService {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  word_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  russian: string;

  @Column({ type: DataType.STRING, allowNull: false })
  english: string;

  @HasMany(() => User)
  user: User;
}
