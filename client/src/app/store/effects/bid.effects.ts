import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { of, Observable } from "rxjs";
import * as JWT from "jwt-decode";
import { map, tap, switchMap, catchError, mergeMap } from "rxjs/operators";
import {
  BidActionTypes,
  GetBids,
  GetBidsSuccess
} from "../actions/bid.actions";

import { BidsService } from "../../core/services/bids.service";
import { GetErrors } from "../actions/error.actions";

@Injectable()
export class BidEffects {
  @Effect()
  Getbids: Observable<any> = this.actions$.pipe(
    ofType<GetBids>(BidActionTypes.GET_BIDS),
    map((action: GetBids) => action.payload),
    mergeMap(payload =>
      this.bidService.getBids(payload).pipe(
        map(bids => {
          console.log(bids);
          return new GetBidsSuccess(bids);
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bidService: BidsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
}
