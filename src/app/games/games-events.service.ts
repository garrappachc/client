import { Injectable } from '@angular/core';
import { IoClientService } from '@app/core/io-client.service';
import { Subject } from 'rxjs';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesEventsService {

  private _gameCreated = new Subject<Game>();

  get gameCreated() {
    return this._gameCreated.asObservable();
  }

  constructor(
    private ioClientService: IoClientService,
  ) {
    this.ioClientService.socket.on('game created', (game: Game) => this._gameCreated.next(game));
  }

}
