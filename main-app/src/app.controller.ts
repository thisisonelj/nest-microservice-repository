import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('/microservice')
export class AppController {
  constructor(
    @Inject('SUBAPP_ONE_SERVICE') private subAppOneClient: ClientProxy,
    @Inject('SUBAPP_TWO_SERVICE') private subAppTwoClient: ClientProxy,
  ) {}

  @Get('/test')
  calc(@Query('num') str: string): Observable<number> {
    const numArr = str.split(',').map((item) => parseInt(item));

    this.subAppTwoClient.emit('log', `calc: ${JSON.stringify(numArr)}`);

    return this.subAppOneClient.send('sum', numArr);
  }
}
