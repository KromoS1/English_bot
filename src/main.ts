import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BotService } from './bot/application/bot.service';
import { KromLogger } from './logger/logger.service';

async function bootstrap() {
  const PORT = process.env.PORT || 3005;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(KromLogger));

  await app.listen(PORT, () => {
    const logger = new Logger('Start');
    logger.log(`Start App - ${PORT}`);

    const bot = app.get(BotService);

    bot.start();
  });
}
bootstrap();
