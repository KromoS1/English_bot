export class BotException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BotException';
    Error.captureStackTrace(this, BotException);
  }
}
