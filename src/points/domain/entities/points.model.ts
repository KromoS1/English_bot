import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../../../user/domain/entities/user.model";
import {IPointModelAttr} from "../dto/point-service.dto";

@Table({tableName: 'points', updatedAt: false})
export class Points extends Model<Points, IPointModelAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    point_id: number;

    @Column({type: DataType.INTEGER, allowNull:false, defaultValue: 0})
    points: number;

    @HasOne(() => User)
    user: User
}