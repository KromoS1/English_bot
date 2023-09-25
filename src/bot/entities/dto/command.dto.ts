import { Injectable } from '@nestjs/common';
import { ICommand } from './interface-bot';

@Injectable()
export class Command implements ICommand {
  start = 'start' as const;
  add_words = 'add_words' as const;
  start_game = 'start_game' as const;
  get_points_month = 'get_points_month' as const;
  get_points_all = 'get_points_all' as const;
  description = 'description' as const;
  refresh = 'refresh' as const;
}
