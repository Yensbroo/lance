import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { User } from "../../core/models/user";
import { AppState, ErrorState } from "../../store/app.state";
import { Login } from "../../store/actions/auth.actions";
import { Observable } from "../../../../node_modules/rxjs";
import * as fromReducer from "../../store/reducers/error.reducers";
import { Actions } from "@ngrx/effects";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  getErrors: Observable<any>;
  error: Observable<any>;

  constructor(private store: Store<ErrorState>, private actions$: Actions) {
    this.getErrors = store.select(fromReducer.getErrors);
    this.getErrors.subscribe(err => {
      console.log(err.message);
      this.error = err.message;
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new Login(payload));
  }
}
