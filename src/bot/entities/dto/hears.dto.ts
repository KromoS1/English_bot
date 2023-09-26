import { Injectable } from '@nestjs/common';
import { IHears } from './interface-bot';

@Injectable()
export class Hears implements IHears {
  add_words = 'Add Words' as const;
  start_game = 'Start game' as const;
  get_points_month = 'Get points month' as const;
  get_points_all = 'Get Points all' as const;
  description = 'Description' as const;
  refresh = 'Refresh' as const;
}
