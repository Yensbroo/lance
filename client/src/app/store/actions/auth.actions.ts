import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  REGISTER = "[Auth] Register",
  REGISTER_SUCCESS = "[Auth] Register Success",
  REGISTER_FAILURE = "[Auth] Register Failure",
  CURRENT_USER = "[Auth] Current User",
  LOGOUT = "[Auth] Logout"
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

export class CurrentUser implements Action {
  readonly type = AuthActionTypes.CURRENT_USER;
  constructor(public payload: any) {}
}

export type All =
  | Login
  | LoginSuccess
  | Register
  | RegisterSuccess
  | CurrentUser
  | Logout;
