import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { State } from './games.reducer';
import { adapter } from './games.adapter';

const gamesFeature = createFeatureSelector<AppState, State>('games');
export const gamesLoaded = createSelector(gamesFeature, games => games.loaded);

const { selectAll, selectEntities } = adapter.getSelectors();
export const allGames = createSelector(gamesFeature, selectAll);

const gameEntities = createSelector(gamesFeature, selectEntities);
export const gameById = (gameId: string) => createSelector(gameEntities, entities => entities[gameId]);