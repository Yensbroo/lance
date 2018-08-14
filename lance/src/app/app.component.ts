import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as JWT from 'jwt-decode'
import { AuthState, AppState } from "./store/app.state";
import { AuthActionTypes } from "./store/actions/auth.actions";
import * as fromReducer from './store/reducers/auth.reducers';
import { User } from "./core/models/user";
import { map } from "../../node_modules/rxjs/operators";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  isOpen = false;
  getState: Observable<any>;
  isAuthenticated: false;
  user: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.user = this.store.pipe(select(fromReducer.getAuth))
  }


  ngOnInit() {
    this.isOpen = false;
    if (localStorage.token) {
      this.setUser().then(() => {
        this.getState.subscribe((user) => {
          this.user = user.user;
          this.isAuthenticated = user.isAuthenticated
        })
      })
    }
  }

  setUser() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      const decoded = JWT(token);
      this.store.dispatch({ type: AuthActionTypes.CURRENT_USER, payload: decoded });
      resolve();
    })
  }

  openNav(e) {
    this.isOpen = e;
    console.log(this.isOpen);
  }

  closeNav() {
    this.isOpen = false;
  }
}
