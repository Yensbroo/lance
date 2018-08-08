import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../models/user';
import { Store } from "../../../../node_modules/@ngrx/store";
import { AppState, selectAuthState } from "../../store/app.state";
import { Observable } from "../../../../node_modules/rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public _currentUser: User;
  getState: Observable<any>;
  authToken: any;
  private apiUrl = "http://localhost:8000/api/v1";
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  login(email, password) {
    return this.http.post<User>(this.apiUrl + "/login", { email, password });
  }

  storeUser(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this._currentUser = user;
  }

  register(user) {
    return this.http.post<User>(this.apiUrl + "/register", user);
  }

  getUser() {
    this.getState.subscribe((state) => {
      this._currentUser = state.user;
    })
  }

  loggedIn() {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("id_token");
    return jwtHelper.isTokenExpired(token);
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  logoutUser() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
  }
}
