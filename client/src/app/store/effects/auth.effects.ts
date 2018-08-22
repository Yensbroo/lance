import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { of, Observable } from "rxjs";
import * as JWT from "jwt-decode";
import { map, tap, switchMap, catchError, mergeMap } from "rxjs/operators";
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  Register,
  RegisterSuccess,
  CurrentUser,
  Logout
} from "../actions/auth.actions";

import { AuthenticationService } from "../../core/services/authentication.service";
import { GetErrors } from "../actions/error.actions";
@Injectable()
export class AuthEffects {
  @Effect()
  Login: Observable<any> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    mergeMap(payload =>
      this.authService.login(payload.email, payload.password).pipe(
        map((user: any) => {
          return new LoginSuccess({
            token: user.token,
            full_name: user.user.full_name,
            email: payload.email
          });
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect()
  Register: Observable<any> = this.actions$.pipe(
    ofType<Register>(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    mergeMap(payload =>
      this.authService.register(payload).pipe(
        map(user => {
          return (
            new RegisterSuccess({ token: user.token, email: payload.email }),
            this.router.navigateByUrl("/registered")
          );
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem("token");
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {}
}
