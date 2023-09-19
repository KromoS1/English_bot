import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LoggerFile, NamesKeyFileType } from './loggerFile';

@Injectable()
export class KromLogger extends ConsoleLogger {
  private filesLoggers;
  constructor() {
    super();
    this.filesLoggers = {
      log: new LoggerFile(LoggerFile.nameFiles.log),
      warn: new LoggerFile(LoggerFile.nameFiles.warn),
      error: new LoggerFile(LoggerFile.nameFiles.error),
    };
  }

  log(message: unknown, context?: unknown): void {
    this.writeLog(LoggerFile.nameFiles.log, message, context);
    super.log(message, context);
  }

  warn(message: unknown, context?: unknown): void {
    this.writeLog(LoggerFile.nameFiles.warn, message, context);
    super.warn(message, context);
  }

  error(message: any, stackOrContext?: string): void {
    const log = `${message}\n${stackOrContext}`;
    this.filesLoggers.error.writeFile(log);

    super.error(message, stackOrContext);
  }

  writeLog(nameFile: NamesKeyFileType, message: unknown, context?: unknown) {
    const loggerFile = this.filesLoggers[nameFile];

    loggerFile.writeFile(`[${context}] --- ${message as string}`);
  }
}
