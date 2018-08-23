import { Action } from "@ngrx/store";

export enum BidActionTypes {
  GET_BIDS = "[Bid] Get bids",
  GET_BIDS_SUCCESS = "[Bid] Get bids success",
  PLACE_BID = "[Bid] Place bid",
  PLACE_BID_SUCCESS = "[Bid] Place bid success"
}

export class GetBids implements Action {
  readonly type = BidActionTypes.GET_BIDS;
  constructor(public payload: any) {}
}

export class GetBidsSuccess implements Action {
  readonly type = BidActionTypes.GET_BIDS_SUCCESS;
  constructor(public payload: any) {}
}

export type All = GetBids | GetBidsSuccess;
