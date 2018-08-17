import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProjectService } from "../../../core/services/project.service";
import { ActivatedRoute } from "@angular/router";
import { IProject } from "../../../core/models/project";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable, timer, Subscription } from "rxjs";
import { take, map } from "rxjs/operators";
import * as moment from "moment";
import "moment/locale/nl-be";
import "moment-precise-range-plugin";
import * as fromProjectReducer from "../../../store/reducers/project.reducers";
import * as fromAuthReducer from "../../../store/reducers/auth.reducers";
import { ProjectActionTypes } from "../../../store/actions/project.actions";
import { User } from "../../../core/models/user";
import { CountdownService } from "../../../core/services/countDown.service";

@Component({
  selector: "app-project-page",
  templateUrl: "./project-page.component.html",
  styleUrls: ["./project-page.component.scss"]
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  project: IProject;
  error: String;
  getProject: Observable<any>;
  getUser: Observable<any>;
  isAuthenticated: boolean;
  user: User[];
  countdownTime;
  sub: Subscription;
  projectEnd: number;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private countdownService: CountdownService
  ) {
    this.getProject = store.select(fromProjectReducer.getProjects);
    this.getUser = store.select(fromAuthReducer.getAuth);
  }

  ngOnInit() {
    this.setUser();
    this.loadProject();
    this.setProject();
    console.log("initialized");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.countdownService.stop();
  }

  setUser() {
    this.getUser.subscribe(data => {
      this.user = data.user;
      this.isAuthenticated = data.isAuthenticated;
    });
  }
  loadProject() {
    return new Promise((resolve, reject) => {
      this.store.dispatch({
        type: ProjectActionTypes.GET_PROJECT,
        payload: this.route.snapshot.params["id"]
      });
      resolve();
    });
  }

  format(t) {
    const today = new Date().getTime();
    const end = moment(new Date(t));
    const now = moment(new Date());
    const distance = t - today;
    const years = end.diff(now, "year");
    now.add(years, "years");

    const months = end.diff(now, "months");
    now.add(months, "months");

    const weeks = end.diff(now, "weeks");
    now.add(weeks, "weeks");

    const days = end.diff(now, "days");
    now.add(days, "days");

    const hours = end.diff(now, "hours");
    now.add(hours, "hours");

    const minutes = end.diff(now, "minutes");
    now.add(minutes, "minutes");

    const seconds = end.diff(now, "seconds");
    now.add(seconds, "seconds");
    if (distance >= 31557600000) {
      return [
        years +
          " jaar " +
          months +
          " maanden " +
          weeks +
          " weken " +
          days +
          " dagen " +
          hours +
          " uur " +
          minutes +
          " minuten " +
          seconds +
          " seconden"
      ];
    } else if (distance >= 2629800000 && distance < 31557600000) {
      return [
        months +
          " maanden " +
          weeks +
          " weken " +
          days +
          " dagen " +
          hours +
          " uur " +
          minutes +
          " minuten " +
          seconds +
          " seconden"
      ];
    } else if (distance <= 2629800000 && distance > 604800017) {
      return [
        weeks +
          " weken " +
          days +
          " dagen " +
          hours +
          " uur " +
          minutes +
          " minuten " +
          seconds +
          " seconden"
      ];
    } else if (distance >= 86400000 && distance < 604800017) {
      return [
        days +
          " dagen " +
          hours +
          " uur " +
          minutes +
          " minuten " +
          seconds +
          " seconden"
      ];
    } else if (distance >= 3600000 && distance < 86400000) {
      return [hours + " uur " + minutes + " minuten " + seconds + " seconden"];
    } else if (distance >= 60000 && distance < 3600000) {
      return [minutes + " minuten " + seconds + " seconden"];
    } else if (distance >= 1000 && distance < 60000) {
      return [seconds + " seconden"];
    }
  }

  setProject() {
    this.sub = this.getProject.subscribe(
      project => {
        this.project = project.project;
        this.projectEnd = new Date(this.project.project_end).getTime();
        this.countdownService.countdown().subscribe(
          t => {
            this.countdownTime = this.format(t);
          },
          null,
          () => (this.countdownTime = "Dit project is afgelopen")
        );
        this.countdownService.start(this.projectEnd);
      },
      err => console.log(err)
    );
  }
}
