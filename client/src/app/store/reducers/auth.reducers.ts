import { User } from "../../core/models/user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthActionTypes, All } from "../actions/auth.actions";
import { AuthState, AppState } from "../app.state";

export const initialState: AuthState = {
  isAuthenticated: false,
  user: [],
  errorMessage: null
};

export function reducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state
      };
    }
    case AuthActionTypes.CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case AuthActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const selectAuthState = createFeatureSelector<AuthState>("authState");

export const getAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);
