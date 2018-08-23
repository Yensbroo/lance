import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProjectService } from "../../../core/services/project.service";
import { ActivatedRoute } from "@angular/router";
import { IProject } from "../../../core/models/project";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable, timer, Subscription, interval } from "rxjs";
import { take, map } from "rxjs/operators";
import * as moment from "moment";
import "moment/locale/nl-be";
import "moment-precise-range-plugin";
import * as fromProjectReducer from "../../../store/reducers/project.reducers";
import * as fromAuthReducer from "../../../store/reducers/auth.reducers";
import * as fromBidReducer from "../../../store/reducers/bid.reducers";
import { ProjectActionTypes } from "../../../store/actions/project.actions";
import { User } from "../../../core/models/user";
import { Bid } from "../../../core/models/bid";
import { BidActionTypes } from "../../../store/actions/bid.actions";
import { resolve } from "url";

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
  bids: Bid;
  countdownTime: String;
  counter$: Observable<number>;
  subTimer: Subscription;
  projectEnd: number;
  getBids: Observable<any>;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.getProject = store.select(fromProjectReducer.getProjects);
    this.getUser = store.select(fromAuthReducer.getAuth);
    this.getBids = store.select(fromBidReducer.getBids);
  }

  ngOnInit() {
    this.setUser();
    this.loadProject();
    this.loadBids();
    this.setBids();
    this.setProject();
  }

  ngOnDestroy() {
    this.subTimer.unsubscribe();
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

  loadBids() {
    return new Promise((resolve, reject) => {
      this.store.dispatch({
        type: BidActionTypes.GET_BIDS,
        payload: this.route.snapshot.params["id"]
      });
      resolve();
    });
  }

  setBids() {
    this.getBids.subscribe(bids => {
      console.log(bids);
      this.bids = bids;
    });
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + " dagen ",
      hours + " uur ",
      minutes + " minuten ",
      seconds + " seconden "
    ].join(" ");
  }

  setProject() {
    this.getProject.subscribe(
      project => {
        this.project = project.project;
        this.projectEnd = new Date(this.project.project_end).getTime();
        this.counter$ = interval(1000).pipe(
          map(x => {
            return Math.floor((this.projectEnd - new Date().getTime()) / 1000);
          })
        );
        this.subTimer = this.counter$.subscribe(x => {
          this.countdownTime = this.dhms(x);
        });
      },
      err => console.log(err)
    );
  }
}
