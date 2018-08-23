import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { IProject } from "../../../core/models/project";
import { Observable } from "rxjs";
import * as fromProjectReducer from "../../../store/reducers/project.reducers";
import * as fromAuthReducer from "../../../store/reducers/auth.reducers";
import { User } from "../../../core/models/user";
import { ProjectActionTypes } from "../../../store/actions/project.actions";

@Component({
  selector: "app-user-project-list",
  templateUrl: "./user-project-list.component.html",
  styleUrls: ["./user-project-list.component.scss"]
})
export class UserProjectListComponent implements OnInit {
  projects: Observable<IProject>;
  user: User;
  getProjects: Observable<any>;
  getUser: Observable<any>;
  constructor(private store: Store<AppState>) {
    this.getProjects = store.select(fromProjectReducer.getProjects);
    this.getUser = store.select(fromAuthReducer.getAuth);
  }

  ngOnInit() {
    this.loadUser();
    this.setProjects();
  }

  loadUser() {
    this.getUser.subscribe(user => {
      this.loadProjects(user.user.id);
    });
  }

  loadProjects(id) {
    this.store.dispatch({
      type: ProjectActionTypes.GET_PROJECTS_USER,
      payload: id
    });
  }

  setProjects() {
    this.getProjects.subscribe(projects => {
      this.projects = projects.projects;
    });
  }
}
