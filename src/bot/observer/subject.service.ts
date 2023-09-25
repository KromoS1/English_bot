import { Injectable } from '@nestjs/common';
import {
  IObserver,
  ISubject,
  IListObservers,
  CommandsType,
} from '../entities/dto/interface-bot';

@Injectable()
export class Subject implements ISubject {
  private listObservers: IListObservers = {
    start: new Set(),
    start_game: new Set(),
    get_point_all: new Set(),
    get_point_month: new Set(),
    description: new Set(),
    refresh: new Set(),
  };

  registerObserver(type: CommandsType, observer: IObserver) {
    this.listObservers[type].add(observer);
  }

  removeObserver(type: CommandsType, observer: IObserver) {
    if (this.listObservers[type].has(observer)) {
      this.listObservers[type].delete(observer);
    }
  }

  notifyObserver(type: CommandsType, ctx: any) {
    this.listObservers[type].forEach((o) => {
      o.update(ctx);
    });
  }
}
