import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IWordsModelAttr } from '../dto/words.dto';
import { User } from 'src/user/domain/entities/user.model';

@Table({ tableName: 'words', updatedAt: false })
export class Words extends Model<Words, IWordsModelAttr> {
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

  @BelongsTo(() => User, 'user_id')
  user: User;
}
