import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { User } from '../../core/models/user';
import { AppState, selectAuthState } from '../../store/app.state';
import { Login } from '../../store/actions/auth.actions'
import { Observable } from "../../../../node_modules/rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
  }
}
