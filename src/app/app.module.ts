import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { QueueModule } from '@app/queue/queue.module';
import { EffectsModule } from '@ngrx/effects';
import { PlayersModule } from '@app/players/players.module';
import { API_URL } from './api-url';
import { environment } from '@environment';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WS_URL } from './ws-url';
import { CoreModule } from './core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GamesModule } from './games/games.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GameServersModule } from './game-servers/game-servers.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),

    AuthModule,
    CoreModule,
    PlayersModule,
    QueueModule,
    SharedModule,
    ProfileModule,
    GamesModule,
    GameServersModule,
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: WS_URL, useValue: environment.wsUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
