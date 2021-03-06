import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { Observable, zip } from 'rxjs';
import { Game } from '../models/game';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, filter, first } from 'rxjs/operators';
import { gameById } from '../games.selectors';
import { loadGame, forceEndGame } from '../games.actions';
import { Player } from '@app/players/models/player';
import { playerById } from '@app/players/players.selectors';
import { loadPlayer } from '@app/players/players.actions';
import { profile } from '@app/profile/profile.selectors';

interface PlayerWithGameClass extends Player {
  gameClass: string;
}

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDetailsComponent implements OnInit {

  game: Observable<Game>;
  playersRed: Observable<PlayerWithGameClass[]>;
  playersBlu: Observable<PlayerWithGameClass[]>;
  isAdmin: Observable<boolean> = this.store.pipe(
    select(profile),
    map(theProfile => theProfile && (theProfile.role === 'super-user' || theProfile.role === 'admin')),
  );

  @ViewChild('connectInput', { static: false })
  connectInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.game = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.store.select(gameById(id)).pipe(
        tap(game => {
          if (!game) {
            this.store.dispatch(loadGame({ gameId: id }));
          }
        }),
      )),
      filter(game => !!game),
      tap(game => {
        const playersForTeam = (teamId: string) => zip(
          ...game.slots
            .filter(p => p.teamId === teamId)
            .map(slot =>
              this.store.pipe(
                select(playerById(slot.playerId)),
                tap(player => {
                  if (!player) {
                    this.store.dispatch(loadPlayer({ playerId: slot.playerId }));
                  }
                }),
                filter(player => !!player),
                map(player => ({ ...player, gameClass: slot.gameClass })),
              )
            )
        );

        const redTeamId = Object.keys(game.teams).find(key => game.teams[key] === 'RED');
        this.playersRed = playersForTeam(redTeamId);
        const bluTeamId = Object.keys(game.teams).find(key => game.teams[key] === 'BLU');
        this.playersBlu = playersForTeam(bluTeamId);
      }),
    );
  }

  copyConnectString() {
    const input = this.connectInput.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
    document.execCommand('copy');
  }

  forceEndGame(event: Event) {
    event.preventDefault();

    this.game.pipe(
      first(),
    ).subscribe(game => this.store.dispatch(forceEndGame({ gameId: game.id })));
  }

}
