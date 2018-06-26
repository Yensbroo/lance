import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  message = "";
  data: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe(
      res => {
        this.data = res;
        this.authService.storeUser(this.data.token, this.data.user);
        this.router.navigate([""]);
      },
      err => {
        this.message = err.error;
      }
    );
  }
}
