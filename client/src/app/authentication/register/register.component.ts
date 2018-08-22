import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { User } from "../../core/models/user";
import { AppState } from "../../store/app.state";
import { Register } from "../../store/actions/auth.actions";
import { Observable } from "rxjs";
import * as fromReducer from "../../store/reducers/error.reducers";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  message = "";
  data: any;
  error: Observable<any>;
  getErrors: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getErrors = store.select(fromReducer.getErrors);
  }

  ngOnInit() {
    this.getErrors.subscribe(err => {
      this.error = err.message;
    });
  }

  onRegister() {
    const payload = {
      full_name: this.user.full_name,
      email: this.user.email,
      password: this.user.password,
      password2: this.user.password2
    };
    this.store.dispatch(new Register(payload));
  }
}
