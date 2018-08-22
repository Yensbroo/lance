import { Error } from "../../core/models/error";
import { State, createFeatureSelector, createSelector } from "@ngrx/store";
import { ErrorActionTypes, All } from "../actions/error.actions";
import { ErrorState } from "../app.state";

export const initialState = {
  message: []
};

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS: {
      return {
        ...state,
        message: action.payload.error.error
      };
    }
    default: {
      return state;
    }
  }
}

export const getErrorState = createFeatureSelector<ErrorState>("errorState");

export const getErrors = createSelector(
  getErrorState,
  (state: ErrorState) => state
);
