import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  full_name: String;
  email: String;
  password: String;
  password2: String;
  message = "";
  data: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegister() {
    const user = {
      full_name: this.full_name,
      email: this.email,
      password: this.password,
      password2: this.password2
    };

    this.authService.register(user).subscribe(
      res => {
        this.data = res;
        console.log(res);
        this.router.navigate(["registered"]);
      },
      err => {
        this.message = err.error;
        console.log(err);
      }
    );
  }
}
