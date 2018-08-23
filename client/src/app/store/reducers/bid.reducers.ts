import { State, createFeatureSelector, createSelector } from "@ngrx/store";
import { BidActionTypes, All } from "../actions/bid.actions";
import { AppState, BidState } from "../app.state";

export const initialState: BidState = {
  bids: []
};

export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case BidActionTypes.GET_BIDS_SUCCESS: {
      return {
        ...state,
        bids: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getBidState = createFeatureSelector<BidState>("bidState");

export const getBids = createSelector(getBidState, (state: BidState) => state);
