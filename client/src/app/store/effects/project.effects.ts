import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { of, Observable } from "rxjs";
import * as JWT from "jwt-decode";
import { map, tap, switchMap, catchError, mergeMap } from "rxjs/operators";
import {
  ProjectActionTypes,
  GetProjects,
  GetProject,
  GetProjectsSuccess,
  GetProjectSuccess,
  SaveProject,
  SaveProjectSuccess,
  PublishProject,
  PublishProjectSuccess,
  GetProjectsUser,
  GetProjectsUserSuccess
} from "../actions/project.actions";

import { ProjectService } from "../../core/services/project.service";
import { GetErrors } from "../actions/error.actions";

@Injectable()
export class ProjectEffects {
  @Effect()
  GetProjects: Observable<any> = this.actions$.pipe(
    ofType<GetProjects>(ProjectActionTypes.GET_PROJECTS),
    switchMap(() =>
      this.projectService
        .getAllProjects()
        .pipe(
          map(
            data => new GetProjectsSuccess(data),
            catchError(err => of(new GetErrors(err)))
          )
        )
    )
  );

  @Effect()
  GetProject: Observable<any> = this.actions$.pipe(
    ofType<GetProject>(ProjectActionTypes.GET_PROJECT),
    map((action: GetProject) => action.payload),
    mergeMap(id =>
      this.projectService.getProjectById(id).pipe(
        map(data => new GetProjectSuccess(data)),
        catchError(err => of(new GetErrors(err)))
      )
    )
  );

  @Effect()
  AddAndSaveProject: Observable<any> = this.actions$.pipe(
    ofType<SaveProject>(ProjectActionTypes.SAVE_PROJECT),
    map((action: SaveProject) => action.payload),
    mergeMap(payload =>
      this.projectService.createAndSaveProject(payload).pipe(
        map(project => {
          return (
            new SaveProjectSuccess(project),
            this.router.navigateByUrl("/opdracht/" + project.id)
          );
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );
  @Effect()
  AddAndPublishProject: Observable<any> = this.actions$.pipe(
    ofType<PublishProject>(ProjectActionTypes.PUBLISH_PROJECT),
    map((action: PublishProject) => action.payload),
    mergeMap(payload =>
      this.projectService.createAndPublishProject(payload).pipe(
        map(project => {
          return (
            new PublishProjectSuccess(project),
            this.router.navigateByUrl("/opdracht/" + project.id)
          );
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );

  @Effect()
  GetProjectsUser: Observable<any> = this.actions$.pipe(
    ofType<GetProjectsUser>(ProjectActionTypes.GET_PROJECTS_USER),
    map((action: GetProjectsUser) => action.payload),
    mergeMap(payload =>
      this.projectService.getProjectsByUser(payload).pipe(
        map(projects => {
          return new GetProjectsUserSuccess(projects);
        }),
        catchError(error => of(new GetErrors({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
}
