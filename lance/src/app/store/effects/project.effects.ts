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
  GetProjectSuccess
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
            catchError(err => of(new GetErrors({ message: err })))
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
        catchError(err => of(new GetErrors({ message: err })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
}
