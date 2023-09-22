export interface IBot {
  bot?: any;
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
  notifyObserver: (type: CommandsType, ctx: any) => void;
}

export type CommandsType = keyof ICommand;

export interface IObserver {
  update: (ctx: any) => void;
}

export type IListObservers = {
  [K in keyof ICommand]: Set<IObserver>;
};
