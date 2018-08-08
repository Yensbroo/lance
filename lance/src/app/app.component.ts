import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as JWT from 'jwt-decode'
import { AppState, selectAuthState } from "./store/app.state";
import { AuthActionTypes } from "./store/actions/auth.actions";
import { User } from './core/models/user'
import { resolve } from "path";



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
  user: User[] = [];

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState)
  }

  ngOnInit() {
    this.isOpen = false;

    if (localStorage.token) {
      const self = this
      this.setUser().then(() => {
        self.getState.subscribe((state) => {
          this.isAuthenticated = state.isAuthenticated;
          this.user = state.user;
          console.log(this.user);
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
