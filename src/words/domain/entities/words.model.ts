import { Model, Table } from 'sequelize-typescript';
import { IWordsModelAttr } from '../dto/words.dto';

@Table({ tableName: 'words', updatedAt: false })
export class Words extends Model<Words, IWordsModelAttr> {}
