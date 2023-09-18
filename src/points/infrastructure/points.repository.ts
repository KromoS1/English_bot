import {Inject} from "@nestjs/common";
import {Points} from "../domain/entities/points.model";

export class PointsRepository {
    @Inject() points: Points
}