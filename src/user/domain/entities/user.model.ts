import { Words } from 'src/words/domain/entities/words.model';
import { IUserModelAttr } from '../dto/user.dto';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Points } from 'src/points/domain/entities/points.model';

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User, IUserModelAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  chat_id: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  fullname: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  username: string;

  @HasMany(() => Words)
  words: Words;

  @HasMany(() => Points)
  points: Points;
}
