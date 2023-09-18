import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../domain/entities/user.model";
import {IUpdateUser, IUserModelAttr} from "../domain/dto/user.service.dto";

@Injectable()
export class UserRepository{

    constructor(
        @InjectModel(User) private usersRepository: typeof User,
    ) { }

    async createUser(userDto: IUserModelAttr) {

        return await this.usersRepository.create(userDto);
    }

    async updateuser(chat_id: number, userDto: IUpdateUser) {

        const userInstance = await this.usersRepository.findOne({ where: { chat_id } });

        if(!userInstance) return false;

        await userInstance.update(userDto);

        return await userInstance.save();
    }
}