import { IUserModelAttr } from '../dto/user.dto';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User, IUserModelAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  chat_id: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  fullname: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  username: string;
}
