import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface IBot {
  bot?: Telegraf<Context<Update>>;
  start: () => void;
  createSubject: () => void;
}

export interface ICommand {
  readonly start: 'start';
  readonly help: 'help';
}

export interface ISubject {
  registerObserver: (type: CommandsType, observer: IObserver) => void;
  removeObserver: (type: CommandsType, observer: IObserver) => void;
  notifyObserver: (type: CommandsType, ctx: Context<Update>) => void;
}

export type CommandsType = keyof ICommand;

export interface IObserver {
  update: (ctx: Context<Update>) => void;
}

export type IListObservers = {
  [K in keyof ICommand]: Set<IObserver>;
};

export type KeyboardType = {
  main: Array<Array<string>>;
};

export interface IKeyboard {
  keyboard?: KeyboardType;
}