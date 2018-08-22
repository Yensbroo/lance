import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  GET_ERRORS = '[Error] error'
}

export class GetErrors implements Action {
  readonly type = ErrorActionTypes.GET_ERRORS;
  constructor(public payload: any) { }
}

export type All = GetErrors;