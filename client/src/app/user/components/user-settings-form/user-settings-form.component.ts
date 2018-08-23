import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable } from "rxjs";
import * as fromErrorReducer from "../../../store/reducers/error.reducers";
import * as fromAuthReducer from "../../../store/reducers/auth.reducers";
import { UpdateUser } from "../../../store/actions/auth.actions";

@Component({
  selector: "app-user-settings-form",
  templateUrl: "./user-settings-form.component.html",
  styleUrls: ["./user-settings-form.component.scss"]
})
export class UserSettingsFormComponent implements OnInit {
  user: User = new User();
  getErrors: Observable<any>;
  error: Observable<any>;
  getUser: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getErrors = store.select(fromErrorReducer.getErrors);
    this.getUser = store.select(fromAuthReducer.getAuth);
  }

  ngOnInit() {
    this.getErrors.subscribe(error => {
      console.log(error);
      this.error = error.message;
    });

    this.getUser.subscribe(user => {
      console.log(user);
      this.user.email = user.user.email;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      oldPassword: this.user.oldPassword,
      newPassword: this.user.newPassword,
      newPassword2: this.user.newPassword2
    };

    this.store.dispatch(new UpdateUser(payload));
  }
}
