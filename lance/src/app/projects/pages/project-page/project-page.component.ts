import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Project } from '../../../core/models/project';
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from '../../../../../node_modules/rxjs';
import * as fromReducer from '../../../store/reducers/project.reducers';
import { ProjectActionTypes } from '../../../store/actions/project.actions';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: Observable<Project[]>;
  error: String;
  getProject: Observable<any>

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private store: Store<AppState>) {
    this.getProject = store.select(fromReducer.getProjects);
  }

  ngOnInit() {
    this.loadProject().then(() => {
      this.getProject.subscribe((data) => {

        this.project = data.project;
      })
    })

  }

  loadProject() {
    return new Promise((resolve, reject) => {
      this.store.dispatch({ type: ProjectActionTypes.GET_PROJECT, payload: this.route.snapshot.params['id'] })
      resolve()
    })
  }


  startCountdown() {
    const endDate = this.project;
    console.log(endDate);
  }
}
