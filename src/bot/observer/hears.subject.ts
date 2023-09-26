import { Injectable } from '@nestjs/common';
import {
  IObserver,
  ISubject,
  IListObservers,
  CommandsType,
  HearsType,
} from '../entities/dto/interface-bot';

@Injectable()
export class HearsSubject implements ISubject<HearsType> {
  listObservers: IListObservers<HearsType> = {
    start_game: new Set(),
    add_words: new Set(),
    get_points_all: new Set(),
    get_points_month: new Set(),
    description: new Set(),
    refresh: new Set(),
  };

  getListListener(type: HearsType) {
    return this.listObservers[type];
  }

  registerObserver(type: HearsType, observer: IObserver) {
    this.listObservers[type].add(observer);
  }

  removeObserver(type: HearsType, observer: IObserver) {
    if (this.listObservers[type].has(observer)) {
      this.listObservers[type].delete(observer);
    }
  }

  notifyObserver(type: HearsType, ctx: any) {
    this.listObservers[type].forEach((o) => {
      o.acceptMessage(ctx);
    });
  }
}
