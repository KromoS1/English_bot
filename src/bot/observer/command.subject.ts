import { Injectable } from '@nestjs/common';
import {
  IObserver,
  ISubject,
  IListObservers,
  CommandsType,
} from '../entities/dto/interface-bot';

@Injectable()
export class CommandSubject implements ISubject<CommandsType> {
  private listObservers: IListObservers<CommandsType> = {
    start: new Set(),
  };

  getListListener(type: CommandsType) {
    return this.listObservers[type];
  }

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
      o.acceptMessage(ctx);
    });
  }
}
