import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import * as JWT from 'jwt-decode';
import { map, tap, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginSuccess, LoginFailure, Register, RegisterSuccess, RegisterFailure, CurrentUser } from '../actions/auth.actions';

import { AuthenticationService } from '../../core/services/authentication.service';
@Injectable()
export class AuthEffects {

  @Effect()
  Login: Observable<any> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    mergeMap(payload => (
      console.log(payload),
      this.authService.login(payload.email, payload.password).pipe(
        map(user => {
          return new LoginSuccess({ token: user.token, email: payload.email })
        }),
        catchError((error) => of(new LoginFailure({ error: error })))
      )
    )
    )
  )

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  Register: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    mergeMap(payload => (
      this.authService.register(payload).pipe(
        map(user => {
          return new RegisterSuccess({ token: user.token, email: payload.email }),
            this.router.navigateByUrl('/registered')
        }),
        catchError((error) => of(new RegisterFailure({ error: error })))
      )
    ))
  )


  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) { }
}