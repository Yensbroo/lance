import { Error } from '../../core/models/error';
import { State } from '@ngrx/store';
import { ErrorActionTypes, All } from '../actions/error.actions';

export const initialState = {
  message: '',
}

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS: {
      return {
        message: action.payload
      }
    }
    default: {
      return state;
    }
  }
}