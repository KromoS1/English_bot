import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Points} from "./domain/entities/points.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        SequelizeModule.forFeature([Points])
    ],
    exports: [],
})
export class PointsModule {}