import { User } from '../../core/models/user';
import { State } from '@ngrx/store';
import { AuthActionTypes, All } from '../actions/auth.actions';

export const initialState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
}

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: null;

}

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'test'
      };
    }
    case AuthActionTypes.CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState
    }
    default: {
      return state;
    }
  }
}