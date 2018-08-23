import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user";
import { Store } from "../../../../node_modules/@ngrx/store";
import { AppState } from "../../store/app.state";
import { Observable } from "../../../../node_modules/rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public _currentUser: User;
  getState: Observable<any>;
  authToken: any;
  private apiUrl = "http://localhost:8000/api/v1";
  constructor(private http: HttpClient) {}

  login(email, password): Observable<User> {
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
    this.getState.subscribe(state => {
      this._currentUser = state.user;
    });
  }

  loggedIn() {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("id_token");
    return jwtHelper.isTokenExpired(token);
  }

  loadToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  logoutUser() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
  }
}
