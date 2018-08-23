import { Action } from "@ngrx/store";

export enum ProjectActionTypes {
  GET_PROJECTS = "[Project] Get projects",
  GET_PROJECT = "[Project] Get project",
  GET_PROJECTS_SUCCESS = "[Project] Get projects success",
  GET_PROJECT_SUCCESS = "[Project] Get project success",
  SAVE_PROJECT = "[Project] Save project",
  SAVE_PROJECT_SUCCESS = "[Project] Save project success",
  PUBLISH_PROJECT = "[Project] Publish project",
  PUBLISH_PROJECT_SUCCESS = "[Project] Publish project success",
  GET_PROJECTS_USER = "[Project] Get projects user",
  GET_PROJECTS_USER_SUCCESS = "[Project] Get projects user success"
}

export class GetProjects implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS;
  constructor(public payload: any) {}
}

export class GetProject implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT;
  constructor(public payload: any) {}
}

export class GetProjectsSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProjectSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveProject implements Action {
  readonly type = ProjectActionTypes.SAVE_PROJECT;
  constructor(public payload: any) {}
}

export class SaveProjectSuccess implements Action {
  readonly type = ProjectActionTypes.SAVE_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}

export class PublishProject implements Action {
  readonly type = ProjectActionTypes.PUBLISH_PROJECT;
  constructor(public payload: any) {}
}

export class PublishProjectSuccess implements Action {
  readonly type = ProjectActionTypes.PUBLISH_PROJECT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProjectsUser implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_USER;
  constructor(public payload: any) {}
}

export class GetProjectsUserSuccess implements Action {
  readonly type = ProjectActionTypes.GET_PROJECTS_USER_SUCCESS;
  constructor(public payload: any) {}
}

export type All =
  | GetProjects
  | GetProject
  | GetProjectsSuccess
  | GetProjectSuccess
  | SaveProject
  | SaveProjectSuccess
  | PublishProject
  | PublishProjectSuccess
  | GetProjects
  | GetProjectsUserSuccess;
