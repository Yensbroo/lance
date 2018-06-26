import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public currentUser: any;
  authToken: any;
  apiUrl = "http://localhost:8000/api/v1";
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post(this.apiUrl + "/login", user);
  }

  storeUser(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.currentUser = user;
  }

  register(user) {
    return this.http.post(this.apiUrl + "/register", user);
  }

  getUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
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
