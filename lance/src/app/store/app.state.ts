import * as auth from './reducers/auth.reducers';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: auth.reducer
}

export const selectAuthState = createFeatureSelector<AppState>('auth');