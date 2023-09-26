import { Injectable } from '@nestjs/common';
import { ICommand } from './interface-bot';

@Injectable()
export class Command implements ICommand {
  start = 'start' as const;
}
