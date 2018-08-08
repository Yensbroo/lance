import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { User } from '../../core/models/user';
import { AppState } from '../../store/app.state';
import { Login } from '../../store/actions/auth.actions'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.user);
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
  }
}
