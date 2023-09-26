import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Hears } from './hears.dto';

export interface IBot {
  bot?: Telegraf<Context<Update>>;
  start: () => void;
  createSubject: () => void;
}

export interface ICommand {
  readonly start: 'start';
}

export interface IHears {
  readonly start_game: 'Start game';
  readonly add_words: 'Add Words';
  readonly get_points_month: 'Get points month';
  readonly get_points_all: 'Get Points all';
  readonly description: 'Description';
  readonly refresh: 'Refresh';
}

export interface ISubject<T> {
  registerObserver: (type: T, observer: IObserver) => void;
  removeObserver: (type: T, observer: IObserver) => void;
  notifyObserver: (type: T, ctx: Context<Update>) => void;
}

export type CommandsType = keyof ICommand;
export type HearsType = keyof IHears;

export interface IObserver {
  acceptMessage: (ctx: Context<Update>) => void;
}

export type IListObservers<T extends string> = {
  [K in T]: Set<IObserver>;
};

export type KeyboardType = {
  main: Array<Array<Hears[keyof Hears]>>; // Получение уникальных строк из значений полей класса
};

export interface IKeyboard {
  keyboard?: KeyboardType;
}
