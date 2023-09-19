import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../../user/domain/entities/user.model';
import { IPointModelAttr } from '../dto/point-service.dto';

@Table({ tableName: 'points', updatedAt: false })
export class Points extends Model<Points, IPointModelAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  point_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  user_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  points: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @HasMany(() => User)
  user: User;
}
