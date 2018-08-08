import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { map, tap, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginSuccess, LogInFailure } from '../actions/auth.actions';

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
        catchError(() => of({ type: 'LOGIN_FAILURE' }))
      )
    )
    )
  )

  // @Effect()
  // LogIn: Observable<any> = this.actions
  //   .ofType(AuthActionTypes.LOGIN)
  //   .map((action: LogIn) => action.payload)
  //   .switchMap(payload => {
  //     return this.authService.login(payload.email, payload.password)
  //       .map((user) => {
  //         console.log(user);
  //         return new LogInSuccess({ token: user.tokenKey, email: payload.email })
  //       })
  //       .catchError((error) => {
  //         console.log(error);
  //         return Observable.of(new LogInFailure({ error: error }));
  //       })
  //   });

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  )

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) { }
}