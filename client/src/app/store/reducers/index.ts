import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromProjectReducer from './project.reducers';
import * as fromAuthReducer from './auth.reducers';
import * as fromErrorReducer from './error.reducers';
import { environment } from '../../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuthReducer.reducer,
  projectState: fromProjectReducer.reducer,
  error: fromErrorReducer.reducer
}

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : []; 