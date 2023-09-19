import { Injectable } from '@nestjs/common';

@Injectable()
export class Command {
  public start = 'start';
  public help = 'help';
}
