import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/domain/entities/user.model';
import { BotModule } from './bot/bot.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { Words } from './words/domain/entities/words.model';
import { WordsModule } from './words/words.module';
import { Points } from './points/domain/entities/points.model';
import { PointsModule } from './points/point.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //@ts-ignore
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      models: [User, Words, Points],
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    LoggerModule,
    BotModule,
    UserModule,
    WordsModule,
    PointsModule,
  ],
})
export class AppModule {}
