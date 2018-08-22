import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  GET_PROJECTS = '[Project] Get projects',
  GET_PROJECT = "[Project] Get project",
  GET_PROJECTS_SUCCESS = "[Project] Get projects success",
  GET_PROJECT_SUCCESS = "[Project] Get project success"
}

export class GetProjects implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS;
  constructor(public payload: any) { }
}

export class GetProject implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT;
  constructor(public payload: any) { }
}

export class GetProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetProjectSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT_SUCCESS;
  constructor(public payload: any) { }
}


export type All = GetProjects | GetProject | GetProjectsSuccess | GetProjectSuccess;