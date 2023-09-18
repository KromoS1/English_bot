import {IUserModelAttr} from "../dto/user.service.dto";
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Points} from "../../../points/domain/entities/points.model";

@Table({tableName: 'user', updatedAt: false})
export class User extends Model<User, IUserModelAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull:false})
    chat_id: number;

    @Column({type: DataType.INTEGER, unique: true, allowNull:false})
    @ForeignKey(() => Points)
    point_id: number;

    @Column({type: DataType.STRING(30), allowNull:false})
    fullname:string;

    @Column({type: DataType.STRING(20), allowNull:false})
    username: string;

    @Column({type: DataType.INTEGER, allowNull:false, defaultValue: 0})
    points: number;
}