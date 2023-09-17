import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

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
      models: [],
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static start() {
    const logger = new Logger('BOT');
    try {
      const bot = new Telegraf(process.env.BOT_TOKEN);

      bot.start((ctx) => {
        console.log(ctx.update.message.chat);
        console.log(ctx.update.message.from);

        ctx.reply('Welcome');
      });
      bot.help((ctx) => ctx.reply('Send me a sticker'));
      bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
      bot.hears('hi', (ctx) => ctx.reply('Hey there'));
      bot.launch();
    } catch (e) {
      logger.error(e);
    }
  }
}

AppModule.start();
