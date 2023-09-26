import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Points } from './domain/entities/points.model';
import { User } from 'src/user/domain/entities/user.model';
import { PointsService } from './application/points.service';

@Module({
  providers: [PointsService],
  imports: [SequelizeModule.forFeature([Points, User])],
  exports: [PointsService],
})
export class PointsModule {}
